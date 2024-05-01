import {
  AuthenticationMethodsProps,
  ErrorResponse,
  LoginResponse,
} from "../HeaderTypes";
import { LOGIN_URL, REGISTER_URL } from "@/api";

export const loginUser: AuthenticationMethodsProps = async (
  data,
  onSuccess,
  onError
) => {
  try {
    const response = await fetch(
      `${LOGIN_URL}?username=${data.email}&password=${data.password}`,
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
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      loginUser(data).then(() => onSuccess && onSuccess());
    } else {
      onError &&
        response.json().then(({ errors }: ErrorResponse) => {
          errors ? onError(errors[0].value) : onError("Something went wrong!");
          console.error("Registration failed");
        });
    }
  } catch (error) {
    onError && onError("Something went wrong!");
    console.error("Error during registration:", error);
  }
};
