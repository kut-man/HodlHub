import { ErrorResponse } from "@/layout/Header/HeaderTypes";
import { PORTFOLIO_URL } from "@/lib/api";
import { Colors } from "./AvatarAssets";
import { PortfolioFields } from "./PortfolioDialogInterfaces";

export interface UpsertPortfolioAsyncProps {
  data: {
    name: string;
    avatar: string;
    color: Colors;
  };
  id?: number;
}

export const upsertPortfolioAsync = ({
  data,
  id,
}: UpsertPortfolioAsyncProps) => {
  if (id) {
    return editPortfolioAsync(data, id);
  }
  return createPortfolioAsync(data);
};

const createPortfolioAsync = async (
  data: Pick<PortfolioFields, "name" | "avatar" | "color">
) => {
  const response = await fetch(PORTFOLIO_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const { errors }: ErrorResponse = await response.json();
    const errorMessage = errors ? errors[0].message : "Something went wrong!";
    console.error("Portfolio creating failed!");
    throw Error(errorMessage);
  }
};

const editPortfolioAsync = async (
  data: Pick<PortfolioFields, "name" | "avatar" | "color">,
  id: number
) => {
  const response = await fetch(`${PORTFOLIO_URL}/${id}`, {
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
    console.error("Portfolio edit failed!");
    throw Error(errorMessage);
  }
};
