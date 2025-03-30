import {
  ErrorResponse,
  LoginFields,
  LoginResponse,
  RegisterFields,
  VerifyEmailFields,
} from "../HeaderTypes";
import { LOGIN_URL, REGISTER_URL, VERIFY_URL } from "@/lib/api";

export const loginUser = async (
  data: LoginFields,
  onSuccess?: () => void,
  onError?: (message: string) => void
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

export const registerUser = async (
  data: RegisterFields,
  onSuccess?: () => void,
  onError?: (message: string) => void
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
      onSuccess && onSuccess();
    } else {
      onError &&
        response.json().then(({ errors, message }: ErrorResponse) => {
          errors
            ? onError(errors[0].message)
            : message
            ? onError(message)
            : onError("Something went wrong!");
          console.error("Registration failed");
        });
    }
  } catch (error) {
    onError && onError("Something went wrong!");
    console.error("Error during registration:", error);
  }
};

export const verifyEmail = async (
  data: VerifyEmailFields,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const response = await fetch(
      `${VERIFY_URL}?email=${encodeURIComponent(
        data.email
      )}&code=${encodeURIComponent(data.code)}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      await loginUser(data);
      onSuccess && onSuccess();
    } else {
      onError &&
        response.json().then(({ message }: ErrorResponse) => {
          message ? onError(message) : onError("Something went wrong!");
          console.error("Email Verification failed");
        });
    }
  } catch (error) {
    onError && onError("Something went wrong!");
    console.error("Error during email verification:", error);
  }
};
