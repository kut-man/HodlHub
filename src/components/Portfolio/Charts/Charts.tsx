import Flex from "@/components/ui/flex.tsx";
import Chart from "./Chart";
import type { Holding } from "../PortfolioDialog/PortfolioDialogInterfaces";

export default function Charts({ data }: { data: Holding[] }) {
  return (
    <Flex className="gap-6">
      <Chart data={data} variant="area" />
      <Chart data={data} className="max-md:hidden" variant="donut" />
    </Flex>
  );
}
