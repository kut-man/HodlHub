import Flex from "@/components/ui/flex.tsx";
import AddTransactionDialog from "./PortfolioHeader/AddTransactionDialog";

export default function EmptyTransaction() {
  return (
    <Flex className="m-auto h-fit gap-4" flexDirection="col">
      <img
        className="h-60"
        src="https://s2.coinmarketcap.com/static/cloud/img/portfolio/no-manual-portfolio.png?_=3350d4d"
        alt="Empty Portfolio"
      />
      <Flex flexDirection="col" className="gap-4">
        <h1 className="w-fit text-center text-xl font-bold sm:text-3xl">
          This portfolio needs some final touches…
        </h1>
        <p className="w-fit text-sm sm:text-xl">Add a coin to get started</p>
      </Flex>
      <AddTransactionDialog
        label="+ Add Transaction"
        className="mb-20"
        size="lg"
      />
    </Flex>
  );
}
