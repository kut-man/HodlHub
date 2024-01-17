import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const valueFormatter = function (number: number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export default function HistoryChart() {
  return (
    <Card className="w-full dark:bg-white/20 border-none shadow-md">
      <CardHeader className="pb-2 pt-4">
        <CardTitle>History</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 text-green-500 flex items-end flex-row">
        <AreaChart
          className="h-72 mt-4"
          data={chartdata}
          index="date"
          yAxisWidth={65}
          categories={["SemiAnalysis", "The Pragmatic Engineer"]}
          colors={["indigo", "cyan"]}
          valueFormatter={valueFormatter}
        />
      </CardContent>
    </Card>
  );
}
