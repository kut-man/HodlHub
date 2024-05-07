import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreatePortfolioProps,
  PortfolioDialogProps,
  PortfolioFields,
} from "./PortfolioDialogInterfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PORTFOLIO_URL } from "@/lib/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ErrorResponse } from "@/layout/Header/HeaderTypes";
import PortfolioIcon from "../PortfolioIcon";

const createPortfolio: CreatePortfolioProps = async (data) => {
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
    const errorMessage = errors ? errors[0].value : "Something went wrong!";
    console.error("Portfolio creating failed!");
    throw Error(errorMessage);
  }
};

export function CreatePortfolio({
  changeCurrentDialogPage,
  onPortfolioCreate,
  iconProperties,
}: PortfolioDialogProps) {
  const [portfolioName, setPortfolioName] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (data: Omit<PortfolioFields, "balance" | "id">) =>
      createPortfolio(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
    onSuccess: onPortfolioCreate,
  });

  const onSubmit = () => mutate({ ...iconProperties, name: portfolioName });

  return (
    <>
      <div className="flex flex-col gap-4 py-4">
        <Label>Portfolio Avatar</Label>
        <div className="flex items-center justify-between">
          <PortfolioIcon
            color={iconProperties.color}
            avatar={iconProperties.avatar}
          />
          <Button onClick={changeCurrentDialogPage}>Change</Button>
        </div>
        <Label htmlFor="name">Portfolio Name</Label>
        <Input
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
          id="name"
          className="col-span-3"
        />
      </div>
      <DialogFooter className="sm:space-x-0 sm:flex-col flex flex-col gap-6">
        {isError && (
          <Label className="font-normal text-red-600">*{error.message}</Label>
        )}
        <Button onClick={onSubmit} className="w-full" size="lg">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Create portfolio"
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
