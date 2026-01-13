import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flex } from "@tremor/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import { Holding } from "../PortfolioDialog/PortfolioDialogInterfaces";
// import HistoryChart from "./HistoryChart";
import TimeIntervalSelector from "./TimeIntervalSelector";
import HistoryChart from "./HistoryChart";
import { AllocationChart } from "./AllocationChart";
import useBreakpoint from "@/lib/useBreakpoint";

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  style: "currency",
  currency: "USD",
});

export const valueFormatter = (number: number) => formatter.format(number);

interface ChartProps {
  variant: "area" | "donut";
  className?: string;
  data: Holding[];
}

const titles: Record<ChartProps["variant"], string> = {
  area: "History",
  donut: "Allocation",
};

export type ChartTimeIntervals = "5m" | "1h" | "6h" | "1d";

export default function Chart(props: ChartProps) {
  const [chart, setChart] = useState(props.variant);
  const [selectedTimeInterval, setSelectedTimeInterval] =
    useState<ChartTimeIntervals>("1d");
  const { isDesktop } = useBreakpoint();

  useEffect(() => {
    if (isDesktop) setChart(props.variant);
  }, [props.variant, isDesktop]);

  return (
    <Card
      className={
        "w-full dark:bg-white/20 border-none !shadow-charts " + props?.className
      }
    >
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="max-md:hidden h-8">
          <Flex flexDirection="row" alignItems="center">
            {titles[chart]}{" "}
            {chart === "area" ? (
              <TimeIntervalSelector
                value={selectedTimeInterval}
                onValueChange={(value) =>
                  setSelectedTimeInterval(value as ChartTimeIntervals)
                }
              />
            ) : null}
          </Flex>
        </CardTitle>
        <Card className="md:hidden p-1">
          {Object.keys(titles).map((title) => (
            <Button
              key={title}
              onClick={() => setChart(title as ChartProps["variant"])}
              variant={chart === title ? "secondary" : "ghost"}
              size="sm"
              className="w-1/2"
            >
              {titles[title as ChartProps["variant"]]}
            </Button>
          ))}
        </Card>
      </CardHeader>
      <CardContent className="pb-4 text-green-500 flex items-end flex-row">
        {chart === "area" ? (
          <HistoryChart interval={selectedTimeInterval} />
        ) : (
          <AllocationChart data={props.data} />
        )}
      </CardContent>
    </Card>
  );
}
