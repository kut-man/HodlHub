import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { TiArrowSortedUp } from "react-icons/ti";

interface PortfolioHeaderProps {
  description: string;
  avatarSrc?: string;
  title: string | number;
  performance: number;
  profitLoss?: number;
}

export default function PerformerTile({
  description,
  avatarSrc,
  title,
  performance,
  profitLoss,
}: PortfolioHeaderProps) {
  function formatCurrency(number: number): string {
    const formattedNumber = number.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
    });

    return formattedNumber;
  }
  return (
    <Card
      className="max-md:rounded-none max-md:flex justify-between max-md:w-full 
    dark:bg-white/20 md:border-none border-x-0 border-t-0 shadow-none md:!shadow-charts"
    >
      <CardHeader className="pb-1 max-md:pl-1 pt-4">
        <CardDescription className="text-sm font-medium">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="max-md:items-end max-md:p-4 pb-4 flex flex-col">
        <div className="flex items-center !m-0">
          {avatarSrc ? (
            <Avatar className="h-6 w-6 m-2 ml-0 my-0 rounded-none">
              <AvatarImage alt="Avatar" src={avatarSrc} />
            </Avatar>
          ) : null}
          <CardTitle className="flex-row text-lg font-bold">{title}</CardTitle>
        </div>
        <div className="flex items-end text-green-500">
          {profitLoss ? (
            <Label className="text-sm mr-2">{formatCurrency(profitLoss)}</Label>
          ) : null}
          <TiArrowSortedUp />
          <Label className="text-sm">{performance + "%"}</Label>
        </div>
      </CardContent>
    </Card>
  );
}
