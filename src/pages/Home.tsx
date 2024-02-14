import { Flex } from "@tremor/react";
import PortfolioList from "@/components/Portfolio/PortfolioList";
import PortfolioHeader from "@/components/Portfolio/PortfolioHeader/PortfolioHeader";
import PerformanceTiles from "@/components/Portfolio/PerformanceTiles/PerformanceTiles";
import Charts from "@/components/Portfolio/Charts/Charts";
import { DataTable } from "@/components/Portfolio/DataTable/DataTable";
import { useState, createContext } from "react";

export const VisibilityContext = createContext(true);

const mockData = {
  balance: 1047.69,
  performance: 0.45,
  profitLoss: 4.7324,
};

export default function Home() {
  const [showCharts, setShowCharts] = useState(true);
  const [visibility, setVisibility] = useState(true);

  function changeVisibility() {
    setVisibility((prev) => !prev);
  }
  return (
    <VisibilityContext.Provider value={visibility}>
      <Flex alignItems="start" className="font-inter lg:flex-row flex-col">
        <PortfolioList />
        <Flex
          className="w-full overflow-auto mt-6 px-6 gap-8"
          alignItems="start"
          flexDirection="col"
        >
          <PortfolioHeader
            changeVisibility={changeVisibility}
            setShowCharts={setShowCharts}
            {...mockData}
          />
          <PerformanceTiles />
          {showCharts ? <Charts /> : null}
          <DataTable />
        </Flex>
      </Flex>
    </VisibilityContext.Provider>
  );
}
