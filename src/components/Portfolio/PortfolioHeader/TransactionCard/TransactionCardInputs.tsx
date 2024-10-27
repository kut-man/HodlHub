import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transaction } from "./TransactionCard";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type TransactionCardInputsProps = {
  register: UseFormRegister<Transaction>;
  errors: FieldErrors<Transaction>;
};

export default function TransactionCardInputs({
  register,
  errors,
}: TransactionCardInputsProps) {
  return (
    <div className="flex gap-2">
      <div className="w-1/2">
        <Label htmlFor="amount" className="text-right">
          Quantity
        </Label>

        <Input
          {...register("amount", {
            required: "Quantity is required!",
            validate: value => value > 0 || "Quantity must be greater than 0",
            pattern: {
              value: /^(?!0\d)\d{0,9}(\.\d{0,9})?$/,
              message: "Max 9 digits before & after decimal",
            },
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
            validate: value => value > 0 || "Price Per Coin must be greater than 0",
            pattern: {
              value: /^(?!0\d)\d{0,9}(\.\d{0,9})?$/,
              message: "Max 9 digits before & after decimal",
            },
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
  );
}
