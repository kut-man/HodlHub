import { Label } from "@radix-ui/react-label";
import { Flex } from "@tremor/react";
import BalanceLabel from "../PerformanceTiles/Labels/BalanceLabel";
import PortfolioIcon from "./PortfolioIcon";
import { PortfolioFields } from "./PortfolioDialog/PortfolioDialogInterfaces";
import { Button } from "@/components/ui/button";

export default function PortfolioItem({
  color,
  avatar,
  name,
  balance,
}: PortfolioFields) {
  return (
    <Button
      aria-label="Select Portfolio"
      variant="secondary"
      className="w-full h-14 p-0 mb-1"
    >
      <Flex justifyContent="start">
        <PortfolioIcon
          color={color}
          avatar={avatar}
          size="small"
          style={{ width: "40px", height: "40px" }}
        />
        <Flex justifyContent="start" alignItems="start" flexDirection="col">
          <Label className="cursor-pointer text-left leading-2 text-base">
            {name}
          </Label>
          <BalanceLabel
            className="cursor-pointer text-left leading-2 font-normal text-gray-500"
            balance={balance}
          />
        </Flex>
      </Flex>
    </Button>
  );
}
