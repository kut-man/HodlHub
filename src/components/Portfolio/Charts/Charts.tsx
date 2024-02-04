import { Flex } from "@tremor/react";
import Chart from "./Chart";

export default function Charts() {
  return (
    <Flex className="gap-6">
      <Chart variant="area" />
      <Chart className="max-md:hidden" variant="donut" />
    </Flex>
  );
}
