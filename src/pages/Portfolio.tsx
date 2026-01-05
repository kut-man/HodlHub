import { Flex } from "@tremor/react";
import PortfolioList from "@/components/Portfolio/PortfolioList/PortfolioList";
import { DataTable } from "@/components/Portfolio/DataTable/DataTable";
import { useState, createContext, useEffect } from "react";
import PortfolioInsights from "@/components/Portfolio/PortfolioInsights";
import { ApiResponse } from "@/lib/AuthContextProvider";
import {
  PortfolioFields,
  PortfolioListFields,
} from "@/components/Portfolio/PortfolioDialog/PortfolioDialogInterfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PORTFOLIO_URL } from "@/lib/api";
import EmptyDashboard from "@/components/Portfolio/EmptyDashboard";
import { Loader2 } from "lucide-react";
import PortfolioHeader from "@/components/Portfolio/PortfolioHeader/PortfolioHeader";
import EmptyTransaction from "@/components/Portfolio/EmptyTransaction";
import { AvatarValues } from "@/components/Portfolio/PortfolioDialog/AvatarAssets";
import PortfolioListMobile from "@/components/Portfolio/PortfolioList/PortfolioListMobile";

export interface GlobalContext {
  privacy: boolean;
  portfolio?: { id: number; name: string } & AvatarValues;
}

export const GlobalContext = createContext<GlobalContext>({ privacy: true });

export default function Portfolio() {
  const [visibility, setVisibility] = useState(
    localStorage.getItem("privacyMode")
      ? localStorage.getItem("privacyMode") === "true"
      : true
  );
  const [portfolio, setPortfolio] = useState<GlobalContext["portfolio"]>();
  const [activePortfolio, setActivePortfolio] = useState<PortfolioFields>();

  const queryClient = useQueryClient();

  function changeVisibility() {
    setVisibility((prev) => {
      localStorage.setItem("privacyMode", (!prev).toString());
      return !prev;
    });
  }

  const { data: portfolioListData, isPending: isPortfolioListDataPending } =
    useQuery<ApiResponse<PortfolioListFields[]>>({
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
    if (
      portfolioListData &&
      portfolioListData.data &&
      portfolioListData.data.length > 0
    ) {
      const selectedPortfolioId = sessionStorage.getItem("selectedPortfolio");
      const selectedPortfolio = selectedPortfolioId
        ? portfolioListData.data.find(
            (portfolio) => portfolio.id == parseInt(selectedPortfolioId)
          ) ?? portfolioListData.data[0]
        : portfolioListData.data[0];

      setPortfolio({
        id: selectedPortfolio.id,
        name: selectedPortfolio.name,
        color: selectedPortfolio.color,
        avatar: selectedPortfolio.avatar,
      });
    }
  }, [portfolioListData]);

  const { data: portfolioData } = useQuery<ApiResponse<PortfolioFields>>({
    queryKey: ["portfolio", portfolio?.id],
    queryFn: async () => {
      if (!portfolio?.id) return;
      const response = await fetch(`${PORTFOLIO_URL}/${portfolio.id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch portfolio data!");
      return await response.json();
    },
    enabled: !!portfolio,
  });

  useEffect(() => {
    if (portfolioData) {
      setActivePortfolio(portfolioData.data);

      // Update the portfolio list cache with the latest portfolio data
      queryClient.setQueryData(
        ["portfolio"],
        (oldData: ApiResponse<PortfolioListFields[]> | undefined) => {
          if (!oldData || !oldData.data) return oldData;

          return {
            ...oldData,
            data: oldData.data.map((portfolio) =>
              portfolio.id === portfolioData.data?.id
                ? { ...portfolio, totalAmount: portfolioData.data.totalAmount }
                : portfolio
            ),
          };
        }
      );
    }
  }, [portfolioData, queryClient]);

  const switchPortfolio = (portfolioValues: GlobalContext["portfolio"]) => {
    if (!portfolioValues || (portfolio && portfolio.id === portfolioValues.id))
      return;
    setPortfolio(portfolioValues);
    sessionStorage.setItem("selectedPortfolio", portfolioValues.id.toString());
  };

  return (
    <GlobalContext.Provider value={{ privacy: visibility, portfolio }}>
      <Flex alignItems="start" className="font-inter lg:flex-row flex-col">
        {isPortfolioListDataPending ? (
          <div className="h-[calc(100vh-173.8px)] flex justify-center items-center w-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : portfolioListData?.data?.length ? (
          <>
            <PortfolioList
              data={portfolioListData.data}
              switchPortfolio={switchPortfolio}
            />

            <PortfolioListMobile
              data={portfolioListData.data}
              switchPortfolio={switchPortfolio}
            />

            <Flex
              className="w-full overflow-auto mt-6 px-6 gap-8"
              alignItems="start"
              flexDirection="col"
            >
              {!activePortfolio || portfolio?.id !== activePortfolio.id ? (
                <div className="h-[calc(100vh-173.8px)] flex justify-center items-center w-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : activePortfolio.holdings ? (
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
                    isEmptyPortfolio={true}
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
