import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AddTransactionDialog from "./AddTransactionDialog";
import PerformanceLabel from "../PerformanceTiles/Labels/PerformanceLabel";
import ProfitLossLabel from "../PerformanceTiles/Labels/ProfitLossLabel";
import BalanceLabel from "../PerformanceTiles/Labels/BalanceLabel";
import { GlobalContext } from "@/pages/Portfolio";
import { useContext } from "react";
import { PortfolioActions } from "./PortfolioActions";
import PortfolioIcon from "../PortfolioList/PortfolioIcon";
import type { AvatarValues } from "../PortfolioDialog/AvatarAssets";
import Flex from "@/components/ui/flex.tsx";
import { Eye, EyeClosed } from "lucide-react";
import { Toggle } from "@/components/ui/toggle.tsx";

interface PortfolioHeaderProps {
  isEmptyPortfolio?: boolean;
  setShowCharts?: React.Dispatch<React.SetStateAction<boolean>>;
  changeVisibility: () => void;
  totalAmount: number;
  valueChange24h: number;
  valueChangePercentage24h: number;
}

export default function PortfolioHeader({
  isEmptyPortfolio,
  setShowCharts,
  changeVisibility,
  totalAmount,
  valueChange24h,
  valueChangePercentage24h,
}: PortfolioHeaderProps) {
  const { privacy, portfolio } = useContext(GlobalContext);
  const { color, avatar, name } = portfolio as AvatarValues & { name: string };
  return (
    <Flex className="flex-col items-start sm:flex-row sm:items-center">
      <div>
        <Flex
          className="max-md:hidden"
          flexDirection="row"
          alignItems="center"
          justifyContent="start"
        >
          <PortfolioIcon
            size="small"
            color={color}
            avatar={avatar}
            className="ml-0"
          />
          <Label className="text-lg">{name}</Label>
        </Flex>
        <Flex
          className="cursor-pointer gap-2"
          flexDirection="row"
          justifyContent="start"
        >
          <BalanceLabel balance={totalAmount} className="text-3xl font-bold" />
          <Toggle
            aria-label="Change Privacy"
            onPressedChange={changeVisibility}
          >
            {privacy ? (
              <Eye onClick={changeVisibility} />
            ) : (
              <EyeClosed onClick={changeVisibility} />
            )}
          </Toggle>
        </Flex>
        <Flex
          className={`my-1 font-medium text-${
            valueChange24h >= 0 ? "green" : "red"
          }-500 items-end ${isEmptyPortfolio ? "hidden" : ""}`}
          flexDirection="row"
          justifyContent="start"
        >
          <ProfitLossLabel
            className="mr-2 text-base"
            profitLoss={valueChange24h}
          />
          {valueChangePercentage24h != 0 ? (
            <PerformanceLabel
              className="mr-2 text-base"
              performance={valueChangePercentage24h}
            />
          ) : null}
          (24h)
        </Flex>
      </div>
      <div className="flex items-center gap-4">
        {setShowCharts ? (
          <div className="hidden items-center space-x-2 sm:inline-flex">
            <Label htmlFor="show-charts">Show Charts</Label>
            <Switch
              defaultChecked={true}
              onCheckedChange={() => setShowCharts((prev: boolean) => !prev)}
              id="show-charts"
            />
          </div>
        ) : null}

        <AddTransactionDialog label="+ Add Transaction" />

        <PortfolioActions />
      </div>
    </Flex>
  );
}
