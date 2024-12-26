import { Flex } from "@tremor/react";
import Chart from "./Chart";
import { Holding } from "../PortfolioDialog/PortfolioDialogInterfaces";

export default function Charts({ data } : { data: Holding[] }) {
  return (
    <Flex className="gap-6">
      <Chart data={data} variant="area" />
      <Chart data={data} className="max-md:hidden" variant="donut" />
    </Flex>
  );
}
