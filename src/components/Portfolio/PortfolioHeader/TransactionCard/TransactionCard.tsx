import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoinSelect } from "./CoinSelect";
import { DateTimePicker } from "./TimePicker/DateTimePicker";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import TransactionCardInputs from "./TransactionCardInputs";
import TransactionTypes from "../TransactionTypesEnum";
import { GlobalContext } from "@/pages/Portfolio";
import { TRANSACTION_URL } from "@/lib/api";
import { ErrorResponse } from "@/layout/Header/HeaderTypes";

type TransactionCardProps = {
  type: TransactionTypes;
};

export type Transaction = {
  transactionType: TransactionTypes;
  amount: number;
  coin: string;
  pricePerCoin: string;
  portfolioId: number;
  date: string;
};

const addTransaction = async (data: Transaction) => {
  console.log(data);
  const response = await fetch(TRANSACTION_URL, {
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
    console.error("Failed to add transaction!");
    throw Error(errorMessage);
  }
};

export default function TransactionCard({ type }: TransactionCardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>();
  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const { portfolioId } = useContext(GlobalContext);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Pick<Transaction, "pricePerCoin" | "amount">) => {
      addTransaction({
        portfolioId: portfolioId as number,
        ...data,
        transactionType: type,
        coin: selectedCoin,
        date: selectedTime.toString(),
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <CoinSelect
          selected={selectedCoin}
          onSelectedChange={(coin) => setSelectedCoin(coin)}
        />
        <TransactionCardInputs register={register} errors={errors} />
        <DateTimePicker
          date={selectedTime}
          setDate={(date) => {
            date && setSelectedTime(date);
          }}
        />
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
          onClick={handleSubmit((data) => mutate(data))}
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
