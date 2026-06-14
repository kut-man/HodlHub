import { GlobalContext } from "@/pages/portfolio";
import { useContext } from "react";

interface AmountProps {
  amount: string;
  className?: string;
  hidable?: boolean;
}

export default function AmountLabel({
  amount,
  className,
  hidable = true,
}: AmountProps) {
  const { privacy } = useContext(GlobalContext);

  return (
    <span className={className}>
      {!privacy && hidable ? "*****" : amount}
    </span>
  );
}
