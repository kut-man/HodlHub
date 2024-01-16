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
    <Card className="dark:bg-white/20 border-none shadow-md">
      <CardHeader className="pb-2 pt-4">
        <CardDescription className="text-base font-medium">
          All-time profit
        </CardDescription>
        <CardTitle>+ $421.06</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 text-green-500 flex items-end flex-row">
        <TiArrowSortedUp className=" mr-1 mb-0.5" />
        <Label className="text-lg">$0.45%</Label>
      </CardContent>
    </Card>
  );
}
