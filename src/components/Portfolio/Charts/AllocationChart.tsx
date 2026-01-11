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
import { useContext, useState } from "react";

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

  const totalValue = data.reduce((sum, holding) => sum + holding.totalValue, 0);
  const chartLegendData = data.reduce((acc, holding) => {
    const percentage = ((holding.totalValue / totalValue) * 100).toFixed(2);
    acc[holding.name] = `${percentage}%`;
    return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <ChartContainer
        config={chartConfig}
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
              wrapperStyle={{ width: "100%", color: "hsl(var(--card-foreground))" }}
              content={
                <ChartLegendContent
                  verticalAlign="middle"
                  values={chartLegendData}
                />
              }
              portal={legendPortal}
            />
          )}

          <Pie
            data={chartData}
            dataKey="totalValue"
            nameKey="name"
            innerRadius={75}
            outerRadius={95}
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
