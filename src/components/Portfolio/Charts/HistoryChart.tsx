import { GlobalContext } from "@/pages/Portfolio";
import { useContext, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ApiResponse } from "@/lib/AuthContextProvider";
import { useQuery } from "@tanstack/react-query";
import { PORTFOLIO_URL } from "@/lib/api";
import { ChartTimeIntervals } from "./Chart";
import {
  ChartContainer,
  ChartTooltipContent,
  CustomTooltipProps,
} from "@/components/ui/chart";

export function formatTimestamp(
  timestamp: string,
  interval: ChartTimeIntervals
): string {
  const date = new Date(timestamp);
  if (interval.endsWith("m")) {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${day} ${month}`;
}

export type HistoryChart = {
  date: string;
  value: number;
};

const HistoryChart = ({ interval }: { interval: ChartTimeIntervals }) => {
  const { privacy, portfolio } = useContext(GlobalContext);
  const [yTickSize, setYTickSize] = useState<undefined | "auto">();

  const { data: portfolioData } = useQuery<ApiResponse<HistoryChart[]>>({
    queryKey: ["historyChart", portfolio?.id, interval],
    queryFn: async () => {
      if (!portfolio?.id) return;
      const response = await fetch(
        `${PORTFOLIO_URL}/${portfolio.id}/chart/${interval}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok)
        throw new Error("Failed to fetch historical chart data!");
      return await response.json();
    },
    enabled: !!portfolio,
  });

  const chartData = portfolioData?.data
    ? portfolioData.data.map((item) => ({
        date: formatTimestamp(item.date, interval),
        value: item.value,
      }))
    : [];

  const areaChartColor =
    chartData.length > 0
      ? chartData[0].value - chartData[chartData.length - 1].value < 0
        ? "#16C784"
        : "#EA3943"
      : "";

  return (
    <ChartContainer
      config={{
        date: { label: "Date", color: areaChartColor },
        value: { label: "Total Value:", color: areaChartColor },
      }}
      className="w-full h-64 aspect-auto"
    >
      <AreaChart
        className="w-full h-64"
        responsive
        data={chartData}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid stroke="hsl(var(--border))" vertical={false} />
        <Tooltip
          content={(props: CustomTooltipProps) => (
            <ChartTooltipContent hideValue={!privacy} {...props} />
          )}
        />
        <XAxis
          tick={{ className: "text-[11px]" }}
          tickMargin={6}
          tickSize={5}
          minTickGap={40}
          dataKey="date"
          axisLine={false}
          hide={!privacy}
        />
        <YAxis
          tick={{ className: "text-[11px]" }}
          tickCount={7}
          orientation="right"
          width={yTickSize}
          axisLine={false}
          tickLine={false}
          hide={!privacy}
          tickFormatter={(value) =>
            value.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })
          }
        />
        <Area
          onAnimationStart={() => setYTickSize("auto")}
          type="monotone"
          dataKey="value"
          stroke={areaChartColor}
          fill={areaChartColor}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default HistoryChart;
