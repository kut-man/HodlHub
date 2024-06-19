import { Flex } from "@tremor/react";
import PortfolioList from "@/components/Portfolio/PortfolioList/PortfolioList";
import { DataTable } from "@/components/Portfolio/DataTable/DataTable";
import { useState, createContext, useLayoutEffect } from "react";
import PortfolioInsights from "@/components/Portfolio/PortfolioInsights";
import { ApiResponse } from "@/lib/AuthProvider";
import { PortfolioFields } from "@/components/Portfolio/PortfolioList/PortfolioDialog/PortfolioDialogInterfaces";
import { useQuery } from "@tanstack/react-query";
import { PORTFOLIO_URL } from "@/lib/api";
import EmptyDashboard from "@/components/Portfolio/EmptyDashboard";
import { Loader2 } from "lucide-react";

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
  });

  useLayoutEffect(() => {
    if (response && response.data && response.data.length > 0) {
      setPortfolioId(response.data[0].id);
    }
  }, [response]);

  return (
    <GlobalContext.Provider value={{ privacy: visibility, portfolioId }}>
      <Flex alignItems="start" className="font-inter lg:flex-row flex-col">
        {isPending ? (
          <div className="h-[calc(100vh-173.8px)] flex justify-center items-center w-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : portfolioId && response?.data ? (
          <>
            <PortfolioList
              data={response?.data}
              changePortfolio={(id: number) => setPortfolioId(id)}
            />
            <Flex
              className="w-full overflow-auto mt-6 px-6 gap-8"
              alignItems="start"
              flexDirection="col"
            >
              <PortfolioInsights changeVisibility={changeVisibility} />
              <DataTable />
            </Flex>
          </>
        ) : (
          <EmptyDashboard />
        )}
      </Flex>
    </GlobalContext.Provider>
  );
}
