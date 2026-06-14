import { useState } from "react";
import PortfolioHeader from "./portfolio-header/portfolio-header";
import Charts from "./charts/charts";
import type { PortfolioFields } from "./portfolio-dialog/portfolio-dialog-interfaces";
import Flex from "@/components/ui/flex.tsx";
import Tile from "./performance-tiles/tile";
import { cryptoAssets } from "./portfolio-header/transaction-card/coin-icon-url";

interface PortfolioInsightsProps {
  changeVisibility: () => void;
  data: PortfolioFields;
}

export default function PortfolioInsights({
  changeVisibility,
  data,
}: PortfolioInsightsProps) {
  const [showCharts, setShowCharts] = useState(true);

  const { statistics } = data;
  const allTimeProfit = {
    description: "All-time profit",
    title: statistics.totalPlValue,
    performance: statistics.totalPlPercentValue,
  };

  const bestPerformer = {
    description: "Best Performer",
    avatarSrc: cryptoAssets[statistics.bestName]?.logo,
    title: statistics.bestTicker,
    performance: statistics.bestPlPercentValue,
    profitLoss: statistics.bestPlValue,
  };

  const worstPerformer = {
    description: "Worst Performer",
    avatarSrc: cryptoAssets[statistics.worstName]?.logo,
    title: statistics.worstTicker,
    performance: statistics.worstPlPercentValue,
    profitLoss: statistics.worstPlValue,
  };

  return (
    <>
      <PortfolioHeader
        changeVisibility={changeVisibility}
        setShowCharts={setShowCharts}
        {...data}
      />
      <Flex className="flex-col md:flex-row md:gap-6" justifyContent="start">
        <Tile {...allTimeProfit} />
        <Tile {...bestPerformer} />
        <Tile {...worstPerformer} />
      </Flex>
      {showCharts ? <Charts data={data.holdings} /> : null}
    </>
  );
}
