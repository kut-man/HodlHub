import { Flex } from "@tremor/react";
import PortfolioList from "@/components/Portfolio/PortfolioList";
import PortfolioHeader from "@/components/Portfolio/PortfolioHeader";
import PerformanceTiles from "@/components/Portfolio/PerformanceTiles";

export default function Home() {
  return (
    <Flex className="lg:flex-row flex-col">
      <PortfolioList />
      <PortfolioHeader />
      <PerformanceTiles />
    </Flex>
  );
}
