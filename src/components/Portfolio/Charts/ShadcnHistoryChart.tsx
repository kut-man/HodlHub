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
import { formatTimestamp, HistoryChart } from "./HistoryChart";
import { ApiResponse } from "@/lib/AuthContextProvider";
import { useQuery } from "@tanstack/react-query";
import { PORTFOLIO_URL } from "@/lib/api";
import { ChartTimeIntervals } from "./Chart";

const ShadcnHistoryChart = ({ interval }: { interval: ChartTimeIntervals }) => {
  const { portfolio } = useContext(GlobalContext);
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
  return (
    <AreaChart
      className="w-full h-64"
      responsive
      data={portfolioData?.data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid stroke="hsl(var(--border))" vertical={false} />
      <XAxis
        tick={{ className: "text-[11px]" }}
        tickMargin={6}
        tickSize={5}
        minTickGap={40}
        tickFormatter={(item) => formatTimestamp(item, interval)}
        dataKey="date"
        axisLine={false}
      />
      <YAxis
        tick={{ className: "text-[11px]" }}
        tickCount={7}
        orientation="right"
        width={yTickSize}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip />
      <Area
        onAnimationEnd={() => setYTickSize("auto")}
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        fill="#8884d8"
      />
    </AreaChart>
  );
};

export default ShadcnHistoryChart;
