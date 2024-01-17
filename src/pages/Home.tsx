import { Flex } from "@tremor/react";
import PortfolioList from "@/components/Portfolio/PortfolioList";
import PortfolioHeader from "@/components/Portfolio/PortfolioHeader";
import PerformanceTiles from "@/components/Portfolio/PerformanceTiles/PerformanceTiles";
import Charts from "@/components/Portfolio/Charts/Charts";
import { DataTable } from "@/components/Portfolio/DataTable/DataTable";

export default function Home() {
  return (
    <Flex alignItems="start" className="font-inter lg:flex-row flex-col">
      <PortfolioList />
      <Flex className="mt-6 px-6 gap-8" alignItems="start" flexDirection="col">
        <PortfolioHeader />
        <PerformanceTiles />
        <Charts />
        <DataTable />
      </Flex>
    </Flex>
  );
}
