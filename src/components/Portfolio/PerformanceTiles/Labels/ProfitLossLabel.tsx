import { Label } from "@/components/ui/label";
import { GlobalContext } from "@/pages/Portfolio";
import { useContext } from "react";

interface ProfitLossLabelProps {
  profitLoss: number;
  className?: string;
}

export default function ProfitLossLabel({
  profitLoss,
  className,
}: ProfitLossLabelProps) {
  const { privacy } = useContext(GlobalContext);
  function formatCurrency(number = profitLoss): string {
    if (!privacy) return `${profitLoss >= 0 ? "+ " : "- "}****`;

    const formattedNumber = number.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
    });

    if (formattedNumber.includes("+")) return `+ ${formattedNumber.slice(1)}`;
    else if (formattedNumber.includes("-"))
      return `- ${formattedNumber.slice(1)}`;
    return "+ " + formattedNumber;
  }
  return (
    <Label
      className={`text-${profitLoss > 0 ? "green" : "red"}-500 ${className}`}
    >
      {formatCurrency()}
    </Label>
  );
}
