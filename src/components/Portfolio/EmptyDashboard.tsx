import { Flex } from "@tremor/react";
import PortfolioDialog from "./PortfolioList/PortfolioDialog";

export default function EmptyDashboard() {
  return (
    <Flex className="gap-4 h-[calc(100vh-173.8px)] m-auto" flexDirection="col">
      <img
        className="h-64"
        src="https://s2.coinmarketcap.com/static/cloud/img/portfolio/no-portfolio.png?_=dce0834"
        alt="portfolio"
      />
      <h1 className="w-fit text-xl sm:text-3xl font-bold">
        Let’s get started with your first portfolio!
      </h1>
      <p className="w-fit text-sm sm:text-xl">
        Track profits, losses and valuation all in one place.
      </p>
      <PortfolioDialog className="my-8 py-8 px-24 border-2 rounded-sm" />
    </Flex>
  );
}
