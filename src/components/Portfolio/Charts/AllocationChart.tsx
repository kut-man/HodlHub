import { Legend, Pie, PieChart, Tooltip } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  CustomTooltipProps,
} from "@/components/ui/chart";
import { Holding } from "../PortfolioDialog/PortfolioDialogInterfaces";
import { cryptoAssets } from "../PortfolioHeader/TransactionCard/coinIconUrl";
import { GlobalContext } from "@/pages/Portfolio";
import { useContext, useMemo, useState } from "react";

export function AllocationChart({ data }: { data: Holding[] }) {
  const [legendPortal, setLegendPortal] = useState<HTMLDivElement | null>(null);
  const { privacy } = useContext(GlobalContext);
  const chartData = data.map((holding) => ({
    name: holding.name,
    totalValue: holding.totalValue,
    fill: cryptoAssets[holding.ticker]?.color || "#8884d8",
  }));

  const chartConfig = data.reduce((acc: ChartConfig, holding) => {
    acc[holding.name] = {
      label: holding.name,
      color: cryptoAssets[holding.ticker]?.color || "#8884d8",
    };
    return acc;
  }, {} satisfies ChartConfig);

  const chartLegendDataSorted = useMemo(() => {
    const totalValue = data.reduce(
      (sum, holding) => sum + holding.totalValue,
      0
    );

    const sorted = data
      .map((holding) => {
        const percentage = (holding.totalValue / totalValue) * 100;
        return {
          label: holding.name,
          value: `${percentage.toFixed(2)}%`,
          percentage,
        };
      })
      .sort((a, b) => b.percentage - a.percentage);

    if (sorted.length <= 7) {
      return sorted.map(({ label, value }) => ({ label, value }));
    }

    const top7 = sorted.slice(0, 7);
    const rest = sorted.slice(7);
    const otherPercentage = rest.reduce(
      (sum, item) => sum + item.percentage,
      0
    );

    return [
      ...top7.map(({ label, value }) => ({ label, value })),
      { label: "Other", value: `${otherPercentage.toFixed(2)}%` },
    ];
  }, [data]);

  return (
    <>
      <ChartContainer
        config={{ ...chartConfig, Other: { label: "Other", color: "#cccccc" } }}
        className="w-[calc(100%-150px)] h-64 aspect-auto"
      >
        <PieChart>
          <Tooltip
            content={(props: CustomTooltipProps) => (
              <ChartTooltipContent hideValue={!privacy} {...props} />
            )}
          />

          {legendPortal && (
            <Legend
              wrapperStyle={{
                width: "100%",
                color: "hsl(var(--card-foreground))",
              }}
              content={
                <ChartLegendContent
                  values={chartLegendDataSorted}
                  hideValue={!privacy}
                />
              }
              portal={legendPortal}
            />
          )}

          <Pie
            data={chartData}
            dataKey="totalValue"
            nameKey="name"
            innerRadius={"60%"}
            outerRadius={"75%"}
          />
        </PieChart>
      </ChartContainer>
      <div
        className="w-[150px] flex items-center h-64 aspect-auto"
        ref={(node) => {
          if (legendPortal == null && node != null) {
            setLegendPortal(node);
          }
        }}
      ></div>
    </>
  );
}
