import { GlobalContext } from "@/pages/portfolio";
import { useContext } from "react";

interface BalanceProps {
  balance: number;
  className?: string;
  hidable?: boolean;
}

export default function BalanceLabel({
  balance,
  className,
  hidable = true,
}: BalanceProps) {
  const { privacy } = useContext(GlobalContext);
  function formatCurrency(number = balance): string {
    if (!privacy && hidable) return "*********";
    const formattedNumber = number.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
    });

    return formattedNumber;
  }
  return <span className={className}>{formatCurrency()}</span>;
}
