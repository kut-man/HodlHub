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
import { PORTFOLIO_URL } from "@/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ErrorResponse } from "@/layout/Header/HeaderTypes";
import PortfolioIcon from "../PortfolioIcon";

const createPortfolio: CreatePortfolioProps = (data, onSuccess, onError) =>
  fetch(PORTFOLIO_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        response.json().then(({ errors }: ErrorResponse) => {
          const errorMessage = errors
            ? errors[0].value
            : "Something went wrong!";
          onError(errorMessage);
          console.error("Portfolio creating failed!");
        });
      }
    })
    .catch((error) => {
      const errorMessage = "Something went wrong!";
      onError(errorMessage);
      console.error("Error during portfolio creation:", error);
    });

export function CreatePortfolio({
  changeCurrentDialogPage,
  onPortfolioCreate,
  iconProperties,
}: PortfolioDialogProps) {
  const [portfolioName, setPortfolioName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: Omit<PortfolioFields, "balance" | "id">) =>
      createPortfolio(data, onPortfolioCreate, setErrorMessage),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["portfolio"] }),
  });

  console.log(error);

  const onSubmit = () => {
    const data = { ...iconProperties, name: portfolioName };
    mutate(data);
  };

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
      <DialogFooter className="flex flex-col gap-6">
        {errorMessage && (
          <Label className="font-normal text-red-600">*{errorMessage}</Label>
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
