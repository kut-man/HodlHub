import { ErrorResponse } from "@/layout/Header/HeaderTypes";
import { USER_URL } from "@/lib/api";
import { Holder } from "@/lib/AuthContextProvider";

export const editProfileAsync = async (data: Holder) => {
  const response = await fetch(USER_URL, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const { errors }: ErrorResponse = await response.json();
    const errorMessage = errors ? errors[0].message : "Something went wrong!";
    console.error("Profile edit failed!");
    throw Error(errorMessage);
  }
};
