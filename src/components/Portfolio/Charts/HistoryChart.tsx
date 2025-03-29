import { AreaChart, CustomTooltipProps } from "@tremor/react";
import { GlobalContext } from "@/pages/Portfolio";
import { useContext } from "react";
import { ChartTimeIntervals, valueFormatter } from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/lib/AuthContextProvider";
import { PORTFOLIO_URL } from "@/lib/api";

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

const ChartTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  console.log(payload);
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border text-sm shadow-md border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="border-b border-inherit px-4 py-2">
          <p className="font-medium text-gray-900 dark:text-gray-50">{label}</p>
        </div>
        <div className="space-y-1 px-4 py-2">
          {payload.map(({ value, color }, index) => (
            <div
              key={`id-${index}`}
              className="flex items-center justify-between space-x-8"
            >
              <div className="flex items-center space-x-2">
                <span
                  aria-hidden="true"
                  className={`h-[3px] w-3.5 shrink-0 rounded-full bg-${color}-500`}
                />
                <p className="whitespace-nowrap text-right text-gray-700 dark:text-gray-300">
                  TotalValue
                </p>
              </div>
              <p className="whitespace-nowrap text-right font-medium tabular-nums text-gray-900 dark:text-gray-50">
                {(value as number).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function HistoryChart({
  interval,
}: {
  interval: ChartTimeIntervals;
}) {
  const { privacy, portfolio } = useContext(GlobalContext);

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
        time: formatTimestamp(item.date, interval),
        TotalValue: item.value,
        value: item.value,
      }))
    : [];

  const areaChartColor =
    chartData.length > 0
      ? chartData[0].TotalValue - chartData[chartData.length - 1].TotalValue < 0
        ? "indigo"
        : "red"
      : "";

  return (
    <AreaChart
      className="h-72 mt-4"
      data={chartData}
      index="time"
      categories={["TotalValue"]}
      colors={[areaChartColor]}
      valueFormatter={valueFormatter}
      showXAxis={privacy}
      showYAxis={privacy}
      showTooltip={privacy}
      autoMinValue
      showAnimation
      customTooltip={ChartTooltip}
      tickGap={20}
      noDataText="Loading..."
    />
  );
}
