import Flex from "@/components/ui/flex.tsx";
import PortfolioDialog from "./portfolio-dialog/portfolio-dialog";

export default function EmptyDashboard() {
  return (
    <Flex className="m-auto h-[calc(100vh-173.8px)] gap-4" flexDirection="col">
      <img
        className="h-60"
        src="https://s2.coinmarketcap.com/static/cloud/img/portfolio/no-portfolio.png?_=dce0834"
        alt="Empty Dashboard"
      />
      <Flex flexDirection="col" className="gap-4">
        <h1 className="w-fit text-center text-xl font-bold sm:text-3xl">
          Let’s get started with your first portfolio!
        </h1>
        <p className="w-fit text-sm sm:text-xl">
          Track profits, losses and valuation all in one place.
        </p>
      </Flex>
      <PortfolioDialog size="lg" className="mb-28 text-base" />
    </Flex>
  );
}
