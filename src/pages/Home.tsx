import { Flex } from "@tremor/react";
import PortfolioList from "@/components/Portfolio/PortfolioList";
import PortfolioHeader from "@/components/Portfolio/PortfolioHeader/PortfolioHeader";
import PerformanceTiles from "@/components/Portfolio/PerformanceTiles/PerformanceTiles";
import Charts from "@/components/Portfolio/Charts/Charts";
import { DataTable } from "@/components/Portfolio/DataTable/DataTable";
import { useState } from "react";

export default function Home() {
  const [showCharts, setShowCharts] = useState(true);
  return (
    <Flex alignItems="start" className="font-inter lg:flex-row flex-col">
      <PortfolioList />
      <Flex
        className="w-full overflow-auto mt-6 px-6 gap-8"
        alignItems="start"
        flexDirection="col"
      >
        <PortfolioHeader setShowCharts={setShowCharts} />
        <PerformanceTiles />
        {showCharts ? <Charts /> : null}
        <DataTable />
      </Flex>
    </Flex>
  );
}
