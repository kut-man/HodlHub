import { Flex } from "@tremor/react";
import AddTransactionDialog from "./PortfolioHeader/AddTransactionDialog";

export default function EmptyTransaction() {
  return (
    <Flex className="gap-4 h-fit m-auto" flexDirection="col">
      <img
        className="h-60"
        src="https://s2.coinmarketcap.com/static/cloud/img/portfolio/no-manual-portfolio.png?_=3350d4d"
        alt="portfolio"
      />
      <Flex flexDirection="col" className="gap-4">
        <h1 className="w-fit text-xl sm:text-3xl font-bold">
          Let’s get started with your first portfolio!
        </h1>
        <p className="w-fit text-sm sm:text-xl">
          Track profits, losses and valuation all in one place.
        </p>
      </Flex>
      <AddTransactionDialog
        label="+ Add Transaction"
        className="mb-20"
        size="lg"
      />
    </Flex>
  );
}
