import { Flex } from "@tremor/react";
import BestPerformerTile from "./BestPerformerTile";
import WorstPerformerTile from "./WorstPerformerTile";
import AllTimeProfitTile from "./AllTimeProfitTile";

export default function PerformanceTiles() {
  return (
    <Flex className="md:gap-6 flex-col md:flex-row" justifyContent="start">
      <AllTimeProfitTile />
      <BestPerformerTile />
      <WorstPerformerTile />
    </Flex>
  );
}
