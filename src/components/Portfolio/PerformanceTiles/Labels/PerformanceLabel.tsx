import { GlobalContext } from "@/pages/Portfolio";
import { useContext } from "react";
import CaretUp from "@/components/Portfolio/PerformanceTiles/Icons/CaretUp.tsx";
import CaretDown from "@/components/Portfolio/PerformanceTiles/Icons/CaretDown.tsx";

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
    <div className="flex items-center">
      {performance >= 0 ? (
        <CaretUp width={12} fill="var(--color-green-500)" />
      ) : (
        <CaretDown width={12} fill="var(--color-red-500)" />
      )}
      <span
        className={`text-sm ${
          performance >= 0 ? "text-green-500" : "text-red-500"
        } ${className}`}
      >
        {formatAsPercentage()}
      </span>
    </div>
  );
}
