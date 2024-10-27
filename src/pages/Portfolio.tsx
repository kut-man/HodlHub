import { Flex } from "@tremor/react";
import PortfolioList from "@/components/Portfolio/PortfolioList/PortfolioList";
import { DataTable } from "@/components/Portfolio/DataTable/DataTable";
import { useState, createContext, useEffect } from "react";
import PortfolioInsights from "@/components/Portfolio/PortfolioInsights";
import { ApiResponse } from "@/lib/AuthProvider";
import { PortfolioFields } from "@/components/Portfolio/PortfolioList/PortfolioDialog/PortfolioDialogInterfaces";
import { useQuery } from "@tanstack/react-query";
import { PORTFOLIO_URL } from "@/lib/api";
import EmptyDashboard from "@/components/Portfolio/EmptyDashboard";
import { Loader2 } from "lucide-react";
import PortfolioHeader from "@/components/Portfolio/PortfolioHeader/PortfolioHeader";
import EmptyTransaction from "@/components/Portfolio/EmptyTransaction";

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
  const [activePortfolio, setActivePortfolio] = useState<PortfolioFields>();

  function changeVisibility() {
    setVisibility((prev) => {
      localStorage.setItem("privacyMode", (!prev).toString());
      return !prev;
    });
  }

  const { data: response, isPending } = useQuery<
    ApiResponse<PortfolioFields[]>
  >({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const response = await fetch(PORTFOLIO_URL, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw Error("Portfolio list fetch failed!");
      return await response.json();
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (response && response.data && response.data.length > 0) {
      setPortfolioId(response.data[0].id);
      setActivePortfolio(response.data[0]);
    }
  }, [response]);

  const changePortfolio = (id: number) => {
    setPortfolioId(id);
    setActivePortfolio(response?.data?.find((portfolio) => portfolio.id == id));
  };

  return (
    <GlobalContext.Provider value={{ privacy: visibility, portfolioId }}>
      <Flex alignItems="start" className="font-inter lg:flex-row flex-col">
        {isPending && !activePortfolio  ? (
          <div className="h-[calc(100vh-173.8px)] flex justify-center items-center w-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : activePortfolio && response?.data ? (
          <>
            <PortfolioList
              data={response.data}
              changePortfolio={changePortfolio}
            />

            <Flex
              className="w-full overflow-auto mt-6 px-6 gap-8"
              alignItems="start"
              flexDirection="col"
            >
              {activePortfolio.statistics ? (
                <>
                  <PortfolioInsights
                    data={activePortfolio}
                    changeVisibility={changeVisibility}
                  />
                  <DataTable data={activePortfolio.holdings} />
                </>
              ) : (
                <>
                  <PortfolioHeader
                    changeVisibility={changeVisibility}
                    totalAmount={0}
                    valueChange24h={0}
                    valueChangePercentage24h={0}
                  />

                  <EmptyTransaction />
                </>
              )}
            </Flex>
          </>
        ) : (
          <EmptyDashboard />
        )}
      </Flex>
    </GlobalContext.Provider>
  );
}
