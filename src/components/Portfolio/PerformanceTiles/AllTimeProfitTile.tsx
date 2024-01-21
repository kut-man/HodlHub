import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { TiArrowSortedUp } from "react-icons/ti";

export default function AllTimeProfitTile() {
  return (
    <Card className="md:rounded-lg rounded-none md:block flex justify-between md:w-fit w-full dark:bg-white/20 md:border-none border-x-0 border-t-0 md:!shadow-charts">
      <CardHeader className="pb-1 max-md:pl-1 pt-4">
        <CardDescription className="text-sm font-medium">
          All-time profit
        </CardDescription>
      </CardHeader>
      <CardContent className="max-md:items-end max-md:p-4 pb-4 flex flex-col">
        <CardTitle className="text-green-500 font-bold text-lg !m-0">
          + $421.06
        </CardTitle>
        <div className="flex text-green-500">
          <TiArrowSortedUp className="ml-2" />
          <Label className="text-sm">$0.45%</Label>
        </div>
      </CardContent>
    </Card>
  );
}
