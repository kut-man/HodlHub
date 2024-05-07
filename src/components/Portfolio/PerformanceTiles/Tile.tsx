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

export default function PerformerTile({
  description,
  avatarSrc,
  title,
  performance,
  profitLoss,
}: PortfolioHeaderProps) {
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
            <AvatarWithSkeleton
              className="h-6 w-6 m-2 ml-0 my-0 rounded-none"
              alt={`${description}'s Icon`}
              src={avatarSrc}
            />
          ) : null}
          <CardTitle className="flex-row text-lg font-bold">
            {typeof title === "number" ? (
              <ProfitLossLabel
                className="font-bold text-lg"
                profitLoss={title}
              />
            ) : (
              title
            )}
          </CardTitle>
        </div>
        <div className="flex items-end">
          {profitLoss ? (
            <ProfitLossLabel className="text-sm mr-2" profitLoss={profitLoss} />
          ) : null}
          <PerformanceLabel performance={performance} />
        </div>
      </CardContent>
    </Card>
  );
}
