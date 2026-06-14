import Flex from "@/components/ui/flex.tsx";
import Chart from "./chart";
import type { Holding } from "../portfolio-dialog/portfolio-dialog-interfaces";

export default function Charts({ data }: { data: Holding[] }) {
  return (
    <Flex className="gap-6">
      <Chart data={data} variant="area" />
      <Chart data={data} className="max-md:hidden" variant="donut" />
    </Flex>
  );
}
