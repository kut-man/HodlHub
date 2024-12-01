import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coin, CoinSelect } from "./CoinSelect";
import { DateTimePicker } from "./TimePicker/DateTimePicker";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import TransactionCardInputs from "./TransactionCardInputs";
import TransactionTypes from "../TransactionTypesEnum";
import { GlobalContext } from "@/pages/Portfolio";
import { TRANSACTION_URL } from "@/lib/api";
import { ErrorResponse } from "@/layout/Header/HeaderTypes";
import { Label } from "@/components/ui/label";

type TransactionCardProps = {
  type: TransactionTypes;
  onSuccess: () => void;
  defaultSelectedCoinTicker?: string;
};

export type Transaction = {
  transactionType: TransactionTypes;
  amount: number;
  coin: string;
  pricePerCoin: number;
  portfolioId: number;
  date: string;
};

const addTransaction = async (data: Transaction) => {
  const response = await fetch(TRANSACTION_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const { message }: ErrorResponse = await response.json();
    const errorMessage = message;
    console.error("Failed to add transaction!");
    throw Error(errorMessage);
  }
};

export default function TransactionCard({
  type,
  onSuccess,
  defaultSelectedCoinTicker,
}: TransactionCardProps) {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>();
  const [selectedCoin, setSelectedCoin] = useState<Coin>();
  const [selectedTime, setSelectedTime] = useState(new Date());
  const { portfolioId } = useContext(GlobalContext);

  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (data: Transaction) => addTransaction(data),
    onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <CoinSelect
          defaultSelectedCoinTicker={defaultSelectedCoinTicker}
          onSelectedChange={(coin) => {
            setSelectedCoin(coin), setValue("pricePerCoin", coin.currentPrice);
          }}
        />
        <TransactionCardInputs register={register} errors={errors} />
        <DateTimePicker
          date={selectedTime}
          setDate={(date) => {
            if (date) setSelectedTime(date);
          }}
        />
        <Card>
          <CardHeader className="py-4">
            <CardDescription>
              Total {type === "buy" ? "Spent" : "Received"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="font-bold">
              $
              {selectedCoin?.currentPrice
                ? (watch("pricePerCoin") * watch("amount")).toFixed(2)
                : "0.00"}
            </CardTitle>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {isError && (
          <Label className="font-normal text-red-600">*{error.message}</Label>
        )}
        <Button
          onClick={handleSubmit((data) => {
            if (selectedCoin?.ticker && portfolioId) {
              mutate({
                ...data,
                portfolioId: portfolioId,
                coin: selectedCoin?.ticker,
                transactionType: type,
                date: selectedTime.toString(),
              });
            }
          })}
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
