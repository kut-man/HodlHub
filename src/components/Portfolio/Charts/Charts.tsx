import { Flex } from "@tremor/react";
import HistoryChart from "./HistoryChart";
import AllocationChart from "./AllocationChart";

export default function Charts() {
  return (
    <Flex className="gap-6">
      <HistoryChart />
      <AllocationChart />
    </Flex>
  );
}
