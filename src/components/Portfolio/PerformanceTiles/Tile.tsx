import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import PerformanceLabel from "./Labels/PerformanceLabel";
import ProfitLossLabel from "./Labels/ProfitLossLabel";
import AvatarWithSkeleton from "@/components/ui/AvatarWithSkeleton";

interface PortfolioHeaderProps {
  description: string;
  avatarSrc?: string;
  title: string | number;
  performance: number;
  profitLoss?: number;
}

export default function Tile({
  description,
  avatarSrc,
  title,
  performance,
  profitLoss,
}: PortfolioHeaderProps) {
  return (
    <Card className="md:shadow-charts! justify-between border-x-0 border-t-0 shadow-none max-md:flex max-md:w-full max-md:rounded-none md:border-none dark:bg-white/20">
      <CardHeader className="pt-4 pb-1 max-md:pl-1">
        <CardDescription className="text-sm font-medium">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col pb-4 max-md:items-end max-md:p-4">
        <div className="m-0! flex items-center">
          {avatarSrc ? (
            <AvatarWithSkeleton
              className="m-2 my-0 ml-0 h-6 w-6 rounded-none"
              alt={`${description}'s Icon`}
              src={avatarSrc}
            />
          ) : null}
          <CardTitle className="flex-row text-lg font-bold">
            {typeof title === "number" ? (
              <ProfitLossLabel
                className="text-lg font-bold"
                profitLoss={title}
              />
            ) : (
              title
            )}
          </CardTitle>
        </div>
        <div className="flex items-end">
          {profitLoss ? (
            <ProfitLossLabel className="mr-2 text-sm" profitLoss={profitLoss} />
          ) : null}
          <PerformanceLabel performance={performance} />
        </div>
      </CardContent>
    </Card>
  );
}
