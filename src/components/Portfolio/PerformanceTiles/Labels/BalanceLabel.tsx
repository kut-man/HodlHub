import { Label } from "@/components/ui/label";
import { VisibilityContext } from "@/pages/Portfolio";
import { useContext } from "react";

interface BalanceProps {
  balance: number;
  className?: string;
  hideable?: boolean;
}

export default function BalanceLabel({
  balance,
  className,
  hideable = true,
}: BalanceProps) {
  const visibility = useContext(VisibilityContext);
  function formatCurrency(number = balance): string {
    if (!visibility && hideable) return "*********";
    const formattedNumber = number.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
    });

    return formattedNumber;
  }
  return <Label className={className}>{formatCurrency()}</Label>;
}
