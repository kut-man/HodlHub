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
import { Loader2 } from "lucide-react";
import { ErrorResponse } from "@/layout/Header/HeaderTypes";
import PortfolioIcon from "../PortfolioIcon";
import { useForm, SubmitHandler } from "react-hook-form";

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
    const errorMessage = errors ? errors[0].message : "Something went wrong!";
    console.error("Portfolio creating failed!");
    throw Error(errorMessage);
  }
};

type FormValues = {
  name: string;
};

export function CreatePortfolio({
  changeCurrentDialogPage,
  onPortfolioCreate,
  iconProperties,
}: PortfolioDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (data: Pick<PortfolioFields, "name" | "avatar" | "color">) =>
      createPortfolio(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
    onSuccess: onPortfolioCreate,
  });

  const onSubmit: SubmitHandler<FormValues> = (portfolioName) =>
    mutate({ ...iconProperties, name: portfolioName.name });

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
          {...register("name", {
            required: "Portfolio name is empty!",
            maxLength: {
              value: 24,
              message: "Portfolio name can not be longer that 24 characters!",
            },
          })}
          className="col-span-3"
        />
      </div>
      <DialogFooter className="sm:space-x-0 sm:flex-col flex flex-col gap-6">
        {isError && (
          <Label className="font-normal text-red-600">*{error.message}</Label>
        )}
        {errors.name && (
          <Label className="font-normal text-red-600">
            *{errors.name.message}
          </Label>
        )}
        <Button
          disabled={isPending || errors.name ? true : false}
          onClick={handleSubmit(onSubmit)}
          className="w-full"
          size="lg"
        >
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
