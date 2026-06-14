import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PortfolioDialogProps } from "./portfolio-dialog-interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import PortfolioIcon from "../portfolio-list/portfolio-icon";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import { GlobalContext } from "@/pages/portfolio";
import {
  upsertPortfolioAsync,
  type UpsertPortfolioAsyncProps,
} from "./portfolio-dialog-functions";

type FormValues = {
  name: string;
};

export function UpsertPortfolio({
  changeCurrentDialogPage,
  onPortfolioCreate,
  iconProperties,
  editPortfolio,
  portfolioName,
  setPortfolioName,
}: PortfolioDialogProps) {
  const { portfolio } = useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(
    portfolioName ? { defaultValues: { name: portfolioName } } : {}
  );

  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (data: UpsertPortfolioAsyncProps) => upsertPortfolioAsync(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
    onSuccess: onPortfolioCreate,
  });

  const onSubmit: SubmitHandler<FormValues> = (portfolioName) =>
    mutate({
      data: {
        ...iconProperties,
        name: portfolioName.name,
      },
      id: editPortfolio ? portfolio?.id : undefined,
    });

  return (
    <>
      <div className="flex flex-col gap-4 py-4">
        <p>Portfolio Avatar</p>
        <div className="mb-2 flex items-center justify-between">
          <PortfolioIcon
            size="large"
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
          onChange={(e) => {
            setPortfolioName && setPortfolioName(e.target.value);
          }}
        />
      </div>
      <DialogFooter className="flex flex-col gap-6 sm:flex-col sm:space-x-0">
        {isError && (
          <p className="font-normal text-red-600">*{error.message}</p>
        )}
        {errors.name && (
          <p className="font-normal text-red-600">*{errors.name.message}</p>
        )}
        <Button
          disabled={isPending || errors.name ? true : false}
          onClick={handleSubmit(onSubmit)}
          className="w-full"
          size="lg"
          data-testid="upsert-portfolio-button"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : editPortfolio ? (
            "Save"
          ) : (
            "Create Portfolio"
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
