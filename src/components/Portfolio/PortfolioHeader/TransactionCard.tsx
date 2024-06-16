import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CoinSelect } from "./CoinSelect";
import { DateTimePicker } from "./TimePicker/TimePicker";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export enum TransactionTypes {
  SELL = "sell",
  BUY = "buy",
}

type TransactionCardProps = {
  type: TransactionTypes;
};

type Transaction = {
  transactionType: TransactionTypes;
  amount: number;
  coin: string;
  pricePerCoin: string;
  portfolioId: number;
};

export default function TransactionCard({ type }: TransactionCardProps) {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Transaction>();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Transaction) => {
      console.log(data);
    },
  });

  const onSubmit: SubmitHandler<Transaction> = (data) => {
    mutate(data);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <CoinSelect />
        <div className="flex gap-2">
          <div className="w-1/2">
            <Label htmlFor="amount" className="text-right">
              Quantity
            </Label>

            <Input
              {...register("amount", {
                required: "Quantity is required!",
              })}
              id="amount"
              type="number"
              placeholder="0.00"
              className="col-span-3"
            />
            {errors.amount && (
              <Label className="font-normal text-red-600">
                *{errors.amount.message}
              </Label>
            )}
          </div>
          <div className="w-1/2">
            <Label htmlFor="name" className="text-right">
              Price Per Coin
            </Label>
            <Input
              {...register("pricePerCoin", {
                required: "Price Per Coin is required!",
              })}
              id="pricePerCoin"
              type="number"
              placeholder="0.00"
              className="col-span-3"
            />
            {errors.pricePerCoin && (
              <Label className="font-normal text-red-600">
                *{errors.pricePerCoin.message}
              </Label>
            )}
          </div>
        </div>
        <DateTimePicker />
        <Card>
          <CardHeader className="py-4">
            <CardDescription>
              Total {type === "buy" ? "Spent" : "Received"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="font-bold">$100</CardTitle>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full"
          size="lg"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Add Transaction"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
