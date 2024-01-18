import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChart } from "@tremor/react";

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];

const valueFormatter = (number: number) =>
  `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

export default function AllocationChart() {
  return (
    <Card className="!shadow-charts w-full dark:bg-white/20 border-none">
      <CardHeader className="pb-2 pt-4">
        <CardTitle>Allocation</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 text-green-500 flex items-end flex-row">
        <DonutChart
          className="h-72 mt-4"
          data={cities}
          category="sales"
          index="name"
          valueFormatter={valueFormatter}
          colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
        />
      </CardContent>
    </Card>
  );
}
