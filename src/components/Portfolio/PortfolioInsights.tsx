import { useState } from "react";
import PortfolioHeader from "./PortfolioHeader/PortfolioHeader";
import Charts from "./Charts/Charts";
import PerformanceTiles from "./PerformanceTiles/PerformanceTiles";

const mockData = {
  balance: 1047.69,
  performance: 0.45,
  profitLoss: 4.7324,
};

interface PortfolioInsightsProps {
  changeVisibility: () => void;
}

export default function PortfolioInsights({
  changeVisibility,
}: PortfolioInsightsProps) {
  const [showCharts, setShowCharts] = useState(true);

  return (
    <>
      <PortfolioHeader
        changeVisibility={changeVisibility}
        setShowCharts={setShowCharts}
        {...mockData}
      />
      <PerformanceTiles />
      {showCharts ? <Charts /> : null}
    </>
  );
}
