import {
  AuthenticationMethodsProps,
  ErrorResponse,
  LoginResponse,
} from "../HeaderTypes";

export const loginUser: AuthenticationMethodsProps = async (
  data,
  onSuccess,
  onError
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/login?username=${data.email}&password=${data.password}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (response.ok) {
      onSuccess && onSuccess();
    } else {
      onError &&
        response.json().then(({ message }: LoginResponse) => onError(message));
      console.error("Login failed");
    }
  } catch (error) {
    onError && onError("Something went wrong!");
    console.error("Error during login:", error);
  }
};

export const registerUser: AuthenticationMethodsProps = async (
  data,
  onSuccess,
  onError
) => {
  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      onSuccess && onSuccess();
      loginUser(data)
    } else {
      onError &&
        response.json().then(({ errors }: ErrorResponse) => {
          onError(errors[0].value);
          console.error("Registration failed");
        });
    }
  } catch (error) {
    onError && onError("Something went wrong!");
    console.error("Error during registration:", error);
  }
};
