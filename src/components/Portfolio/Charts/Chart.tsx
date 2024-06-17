import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@tremor/react";
import { DonutChart } from "@tremor/react";
import { cities, chartdata } from "./MockData";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GlobalContext } from "@/pages/Portfolio";
import { useContext, useEffect } from "react";

const valueFormatter = function (number: number) {
  if (number >= 1000) {
    const formattedNumber = number / 1000;
    return "$ " + formattedNumber + "k";
  } else {
    return "$ " + new Intl.NumberFormat("us").format(number).toString();
  }
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
  const { privacy } = useContext(GlobalContext);
  const areaChartColor =
    chartdata[0].rate_open - chartdata[chartdata.length - 1].rate_open < 0
      ? "indigo"
      : "red";

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setChart(props.variant);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [props.variant]);

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
              key={title}
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
            index="time_open"
            yAxisWidth={40}
            categories={["rate_open"]}
            colors={[areaChartColor]}
            valueFormatter={valueFormatter}
            showXAxis={privacy}
            showYAxis={privacy}
            showTooltip={privacy}
            autoMinValue
            curveType="natural"
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
