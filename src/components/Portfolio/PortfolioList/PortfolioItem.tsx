import Flex from "@/components/ui/flex.tsx";
import BalanceLabel from "../PerformanceTiles/Labels/BalanceLabel";
import PortfolioIcon from "./PortfolioIcon";
import type { PortfolioListFields } from "../PortfolioDialog/PortfolioDialogInterfaces";
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
}: PortfolioListFields & {
  onClick: (portfolioValues: GlobalContext["portfolio"]) => void;
}) {
  const { portfolio } = useContext(GlobalContext);
  return (
    <Button
      aria-label="Select Portfolio"
      variant={id === portfolio?.id ? "secondary" : "ghost"}
      className="h-14 w-full p-0"
      onClick={() => onClick({ id, color, avatar, name })}
    >
      <Flex justifyContent="start">
        <PortfolioIcon color={color} avatar={avatar} />
        <Flex justifyContent="start" alignItems="start" flexDirection="col">
          <span className="cursor-pointer text-left text-base">
            {name}
          </span>
          <BalanceLabel
            className="cursor-pointer text-left font-normal text-gray-500"
            balance={totalAmount}
          />
        </Flex>
      </Flex>
    </Button>
  );
}
