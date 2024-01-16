import { Flex } from "@tremor/react";
import BestPerformerTile from "./BestPerformerTile";
import WorstPerformerTile from "./WorstPerformerTile";
import AllTimeProfitTile from "./AllTimeProfitTile";

export default function PerformanceTiles() {
  return (
    <Flex className="gap-6" justifyContent="start">
      <AllTimeProfitTile />
      <BestPerformerTile />
      <WorstPerformerTile />
    </Flex>
  );
}
