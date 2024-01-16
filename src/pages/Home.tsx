import { Flex } from "@tremor/react";
import PortfolioList from "@/components/Portfolio/PortfolioList";
import PortfolioHeader from "@/components/Portfolio/PortfolioHeader";
import PerformanceTiles from "@/components/Portfolio/PerformanceTiles/PerformanceTiles";

export default function Home() {
  return (
    <Flex alignItems="start" className="lg:flex-row flex-col">
      <PortfolioList />
      <Flex className="mt-6 px-6 gap-8" alignItems="start" flexDirection="col">
        <PortfolioHeader />
        <PerformanceTiles />
      </Flex>
    </Flex>
  );
}
