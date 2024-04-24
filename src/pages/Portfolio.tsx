import { Flex } from "@tremor/react";
import PortfolioList from "@/components/Portfolio/PortfolioList/PortfolioList";
import { DataTable } from "@/components/Portfolio/DataTable/DataTable";
import { useState, createContext } from "react";
import PortfolioInsights from "@/components/Portfolio/PortfolioInsights";

export const VisibilityContext = createContext(true);

export default function Portfolio() {
  const [visibility, setVisibility] = useState(
    localStorage.getItem("privacyMode")
      ? (localStorage.getItem("privacyMode") === "true")
      : true
  );

  function changeVisibility() {
    setVisibility((prev) => {
      localStorage.setItem("privacyMode", (!prev).toString());
      return !prev;
    });
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
          <PortfolioInsights changeVisibility={changeVisibility}/>
          <DataTable />
        </Flex>
      </Flex>
    </VisibilityContext.Provider>
  );
}
