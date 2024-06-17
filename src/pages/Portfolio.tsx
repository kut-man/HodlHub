import { Flex } from "@tremor/react";
import PortfolioList from "@/components/Portfolio/PortfolioList/PortfolioList";
import { DataTable } from "@/components/Portfolio/DataTable/DataTable";
import { useState, createContext } from "react";
import PortfolioInsights from "@/components/Portfolio/PortfolioInsights";

export const GlobalContext = createContext<{
  privacy: boolean;
  portfolioId?: number;
}>({ privacy: true });

export default function Portfolio() {
  const [visibility, setVisibility] = useState(
    localStorage.getItem("privacyMode")
      ? localStorage.getItem("privacyMode") === "true"
      : true
  );
  const [portfolioId, setPortfolioId] = useState<number>();

  function changeVisibility() {
    setVisibility((prev) => {
      localStorage.setItem("privacyMode", (!prev).toString());
      return !prev;
    });
  }
  return (
    <GlobalContext.Provider value={{ privacy: visibility, portfolioId }}>
      <Flex alignItems="start" className="font-inter lg:flex-row flex-col">
        <PortfolioList changePortfolio={(id: number) => setPortfolioId(id)} />
        <Flex
          className="w-full overflow-auto mt-6 px-6 gap-8"
          alignItems="start"
          flexDirection="col"
        >
          <PortfolioInsights changeVisibility={changeVisibility} />
          <DataTable />
        </Flex>
      </Flex>
    </GlobalContext.Provider>
  );
}
