import { Label } from "@/components/ui/label";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { GlobalContext } from "@/pages/Portfolio";
import { useContext } from "react";

interface PerformanceLabelProps {
  performance: number;
  className?: string;
  hidable?: boolean;
}

export default function PerformanceLabel({
  performance,
  className = "",
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
      {performance >= 0 ? (
        <TiArrowSortedUp className="mb-px text-green-500" />
      ) : (
        <TiArrowSortedDown className="mb-px text-red-500" />
      )}
      <Label
        className={`text-sm text-${
          performance >= 0 ? "green" : "red"
        }-500 ${className}`}
      >
        {formatAsPercentage()}
      </Label>
    </div>
  );
}
