export default function AllocationLegend({
  data,
}: {
  data: { name: string; totalValue: number; fill: string }[];
}) {
  console.log(data);
  return <div className="w-[30%] h-64 bg-blue-500"></div>;
}
