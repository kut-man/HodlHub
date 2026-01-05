import { Flex } from "@tremor/react";
import { Label } from "@/components/ui/label";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import AddTransactionDialog from "./AddTransactionDialog";
import PerformanceLabel from "../PerformanceTiles/Labels/PerformanceLabel";
import ProfitLossLabel from "../PerformanceTiles/Labels/ProfitLossLabel";
import BalanceLabel from "../PerformanceTiles/Labels/BalanceLabel";
import { GlobalContext } from "@/pages/Portfolio";
import { useContext } from "react";
import { PiEyeClosed } from "react-icons/pi";
import { PortfolioActions } from "./PortfolioActions";
import PortfolioIcon from "../PortfolioList/PortfolioIcon";
import { AvatarValues } from "../PortfolioDialog/AvatarAssets";

interface PortfolioHeaderProps {
  setShowCharts?: React.Dispatch<React.SetStateAction<boolean>>;
  changeVisibility: () => void;
  totalAmount: number;
  valueChange24h: number;
  valueChangePercentage24h: number;
}

export default function PortfolioHeader({
  setShowCharts,
  changeVisibility,
  totalAmount,
  valueChange24h,
  valueChangePercentage24h,
}: PortfolioHeaderProps) {
  const { privacy, portfolio } = useContext(GlobalContext);
  const { color, avatar, name } = portfolio as AvatarValues & { name: string };
  return (
    <Flex className="flex-col sm:flex-row sm:items-center items-start">
      <div>
        <Flex flexDirection="row" alignItems="center" justifyContent="start">
          <PortfolioIcon
            size="small"
            color={color}
            avatar={avatar}
          />
          <Label className="text-lg">{name}</Label>
        </Flex>
        <Flex flexDirection="row" justifyContent="start">
          <BalanceLabel balance={totalAmount} className="font-bold text-3xl" />
          <Button
            aria-label="Toggle number's visibility"
            size="icon"
            variant="ghost"
            onClick={changeVisibility}
          >
            {privacy ? (
              <MdOutlineRemoveRedEye
                color="gray"
                className="mx-2 mt-1"
                size={27}
              />
            ) : (
              <PiEyeClosed color="gray" size={27} />
            )}
          </Button>
        </Flex>
        <Flex
          className={`font-medium my-1 text-${
            valueChange24h >= 0 ? "green" : "red"
          }-500 items-end`}
          flexDirection="row"
          justifyContent="start"
        >
          <ProfitLossLabel
            className="text-base mr-2"
            profitLoss={valueChange24h}
          />
          {valueChangePercentage24h != 0 ? (
            <PerformanceLabel
              className="text-base mr-2"
              performance={valueChangePercentage24h}
            />
          ) : null}
          (24h)
        </Flex>
      </div>
      <div className="flex items-center gap-4">
        {setShowCharts ? (
          <div className="items-center space-x-2 sm:inline-flex hidden">
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
