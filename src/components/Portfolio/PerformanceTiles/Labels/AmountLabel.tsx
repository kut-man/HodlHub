import { Label } from "@/components/ui/label";
import { GlobalContext } from "@/pages/Portfolio";
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

  return <Label className={className}>{!privacy && hidable ? "*****" : amount}</Label>;
}
