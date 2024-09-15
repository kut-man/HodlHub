import { Label } from "@radix-ui/react-label";
import { Flex } from "@tremor/react";
import BalanceLabel from "../PerformanceTiles/Labels/BalanceLabel";
import PortfolioIcon from "./PortfolioIcon";
import { PortfolioFields } from "./PortfolioDialog/PortfolioDialogInterfaces";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { GlobalContext } from "@/pages/Portfolio";

export default function PortfolioItem({
  id,
  color,
  avatar,
  name,
  totalAmount,
  onClick,
}: PortfolioFields & { onClick: (id: number) => void }) {
  const { portfolioId } = useContext(GlobalContext);
  return (
    <Button
      aria-label="Select Portfolio"
      variant={id === portfolioId ? "secondary" : "ghost"}
      className="w-full h-14 p-0 mb-1"
      onClick={() => onClick(id)}
    >
      <Flex justifyContent="start">
        <PortfolioIcon
          color={color}
          avatar={avatar}
          size="small"
          style={{ width: "50px", height: "40px" }}
        />
        <Flex justifyContent="start" alignItems="start" flexDirection="col">
          <Label className="cursor-pointer text-left leading-2 text-base">
            {name}
          </Label>
          <BalanceLabel
            className="cursor-pointer text-left leading-2 font-normal text-gray-500"
            balance={totalAmount}
          />
        </Flex>
      </Flex>
    </Button>
  );
}
