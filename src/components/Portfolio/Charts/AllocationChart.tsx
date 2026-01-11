import { Pie, PieChart, Tooltip } from "recharts";

import {
  ChartContainer,
  ChartTooltipContent,
  CustomTooltipProps,
} from "@/components/ui/chart";
import { Holding } from "../PortfolioDialog/PortfolioDialogInterfaces";
import { cryptoAssets } from "../PortfolioHeader/TransactionCard/coinIconUrl";
import AllocationLegend from "./AllocationLegend";
import { GlobalContext } from "@/pages/Portfolio";
import { useContext } from "react";

export function AllocationChart({ data }: { data: Holding[] }) {
  const { privacy } = useContext(GlobalContext);
  const chartData = data.map((holding) => ({
    name: holding.name,
    totalValue: holding.totalValue,
    fill: cryptoAssets[holding.ticker]?.color || "#8884d8",
  }));

  return (
    <>
      <ChartContainer config={{}} className="w-[70%] h-64 aspect-auto">
        <PieChart responsive barSize={2}>
          <Tooltip
            content={(props: CustomTooltipProps) => (
              <ChartTooltipContent hideValue={!privacy} {...props} />
            )}
          />
          <Pie
            data={chartData}
            dataKey="totalValue"
            nameKey="name"
            innerRadius={75}
            outerRadius={95}
          />
        </PieChart>
      </ChartContainer>
      <AllocationLegend data={chartData} />
    </>
  );
}
