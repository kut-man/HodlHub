import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { TiArrowSortedUp } from "react-icons/ti";

export default function WorstPerformerTile() {
  return (
    <Card className="dark:bg-white/20 border-none !shadow-charts">
      <CardHeader className="pb-1 pt-4">
        <CardDescription className="text-sm font-medium">
          Worst Performer
        </CardDescription>
        <CardTitle className="font-bold text-lg !m-0">+ $421.06</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 text-green-500 flex items-end flex-row">
        <TiArrowSortedUp className=" mr-1 mb-0.5" />
        <Label className="text-sm">$0.45%</Label>
      </CardContent>
    </Card>
  );
}
