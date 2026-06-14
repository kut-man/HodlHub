import BalanceLabel from "../performance-tiles/labels/balance-label";
import PortfolioIcon from "./portfolio-icon";
import type { PortfolioListFields } from "../portfolio-dialog/portfolio-dialog-interfaces";
import { useContext } from "react";
import { GlobalContext } from "@/pages/portfolio";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar.tsx";

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
    <SidebarMenuItem>
      <SidebarMenuButton
        variant={id === portfolio?.id ? "outline" : "default"}
        onClick={() => onClick({ id, color, avatar, name })}
        className="h-12"
      >
        <PortfolioIcon className="m-0" color={color} avatar={avatar} />
        <span className="cursor-pointer text-left text-base">{name}</span>
        <SidebarMenuBadge>
          <BalanceLabel
            className="cursor-pointer text-left font-normal text-gray-500"
            balance={totalAmount}
          />
        </SidebarMenuBadge>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
