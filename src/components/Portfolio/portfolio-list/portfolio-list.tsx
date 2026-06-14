import PortfolioDialog from "../portfolio-dialog/portfolio-dialog";
import PortfolioItem from "./portfolio-item";
import type { PortfolioListFields } from "../portfolio-dialog/portfolio-dialog-interfaces";
import { GlobalContext } from "@/pages/portfolio";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar.tsx";

export interface PortfolioListProps {
  switchPortfolio: (portfolioValues: GlobalContext["portfolio"]) => void;
  data: PortfolioListFields[];
}

export default function PortfolioList({
  switchPortfolio,
  data,
}: PortfolioListProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Portfolios</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {data.map((portfolio) => (
                <PortfolioItem
                  onClick={switchPortfolio}
                  key={portfolio.id}
                  {...portfolio}
                />
              ))}

              <PortfolioDialog
                className="h-fit p-0 text-base"
                variant="ghost"
                size="sm"
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
