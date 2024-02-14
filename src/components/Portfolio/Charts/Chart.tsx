import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@tremor/react";
import { DonutChart } from "@tremor/react";
import { cities, chartdata } from "./MockData";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const valueFormatter = function (number: number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

interface ChartProps {
  variant: "area" | "donut";
  className?: string;
}

const titles: Record<ChartProps["variant"], string> = {
  area: "History",
  donut: "Allocation",
};

export default function Chart(props: ChartProps) {
  const [chart, setChart] = useState(props.variant);
  return (
    <Card
      className={
        "w-full dark:bg-white/20 border-none !shadow-charts " + props?.className
      }
    >
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="max-md:hidden">{titles[chart]}</CardTitle>
        <Card className="md:hidden p-1">
          {Object.keys(titles).map((title) => (
            <Button
              onClick={() => setChart(title as ChartProps["variant"])}
              variant="ghost"
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
          <AreaChart
            className="h-72 mt-4"
            data={chartdata}
            index="date"
            yAxisWidth={65}
            categories={["SemiAnalysis", "The Pragmatic Engineer"]}
            colors={["indigo", "cyan"]}
            valueFormatter={valueFormatter}
          />
        ) : (
          <DonutChart
            className="h-72 mt-4"
            data={cities}
            category="sales"
            index="name"
            valueFormatter={valueFormatter}
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />
        )}
      </CardContent>
    </Card>
  );
}
