import { Label } from "@/components/ui/label";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { GlobalContext } from "@/pages/Portfolio";
import { useContext } from "react";

interface PerformanceLabelProps {
  performance: number;
  text?: "sm" | "base" | "xs";
  hidable?: boolean;
}

export default function PerformanceLabel({
  performance,
  text = "sm",
  hidable = true,
}: PerformanceLabelProps) {
  const { privacy } = useContext(GlobalContext);
  function formatAsPercentage(number = performance): string {
    if (!privacy && hidable) return "****";
    const absoluteNumber = Math.abs(number).toFixed(2);
    const result = `${absoluteNumber}%`;

    return result;
  }
  return (
    <div className="flex items-end">
      {performance > 0 ? (
        <TiArrowSortedUp className="mb-px text-green-500" />
      ) : (
        <TiArrowSortedDown className="mb-px text-red-500" />
      )}
      <Label
        className={`text-${text} text-${performance > 0 ? "green" : "red"}-500`}
      >
        {formatAsPercentage()}
      </Label>
    </div>
  );
}
