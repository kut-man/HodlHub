import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Flex from "@/components/ui/flex.tsx";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import type { Holding } from "../portfolio-dialog/portfolio-dialog-interfaces";
import TimeIntervalSelector from "./time-interval-selector";
import HistoryChart from "./history-chart";
import { AllocationChart } from "./allocation-chart";
import useBreakpoint from "@/lib/use-breakpoint";

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
        "shadow-charts! w-full border-none dark:bg-white/20 " + props?.className
      }
    >
      <CardHeader>
        <CardTitle className="h-8 max-md:hidden">
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
        <Card className="flex-row p-1 md:hidden gap-0">
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
      <CardContent className="flex flex-row items-end text-green-500">
        {chart === "area" ? (
          <HistoryChart interval={selectedTimeInterval} />
        ) : (
          <AllocationChart data={props.data} />
        )}
      </CardContent>
    </Card>
  );
}
