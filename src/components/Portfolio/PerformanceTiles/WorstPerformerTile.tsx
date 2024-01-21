import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <Card className="md:rounded-lg rounded-none md:block flex justify-between md:w-fit w-full dark:bg-white/20 md:border-none border-x-0 border-t-0 md:!shadow-charts">
      <CardHeader className="pb-1 max-md:pl-1 pt-4">
        <CardDescription className="text-sm font-medium">
          Worts Performer
        </CardDescription>
      </CardHeader>
      <CardContent className="max-md:items-end max-md:p-4 pb-4 flex flex-col">
        <div className="flex items-center !m-0">
          <Avatar className="h-6 w-6 m-2 ml-0 my-0 rounded-none">
            <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle className="flex-row text-lg font-bold">ADA</CardTitle>
        </div>
        <div className="flex text-green-500">
          <Label className="text-sm"> + $0.45%</Label>
          <TiArrowSortedUp className="ml-2" />
          <Label className="text-sm">$0.45%</Label>
        </div>
      </CardContent>
    </Card>
  );
}
