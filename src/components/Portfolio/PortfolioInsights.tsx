import { useState } from "react";
import PortfolioHeader from "./PortfolioHeader/PortfolioHeader";
import Charts from "./Charts/Charts";
import { PortfolioFields } from "./PortfolioDialog/PortfolioDialogInterfaces";
import { Flex } from "@tremor/react";
import Tile from "./PerformanceTiles/Tile";
import { cryptoLogos } from "./PortfolioHeader/TransactionCard/coinIconUrl";

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
    avatarSrc: cryptoLogos[statistics.bestName],
    title: statistics.bestTicker,
    performance: statistics.bestPlPercentValue,
    profitLoss: statistics.bestPlValue,
  };

  const worstPerformer = {
    description: "Worst Performer",
    avatarSrc: cryptoLogos[statistics.worstName],
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
      <Flex className="md:gap-6 flex-col md:flex-row" justifyContent="start">
        <Tile {...allTimeProfit} />
        <Tile {...bestPerformer} />
        <Tile {...worstPerformer} />
      </Flex>
      {showCharts ? <Charts data={data.holdings} /> : null}
    </>
  );
}
