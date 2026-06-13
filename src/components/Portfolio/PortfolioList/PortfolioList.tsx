import PortfolioDialog from "../PortfolioDialog/PortfolioDialog";
import PortfolioItem from "./PortfolioItem";
import type { PortfolioListFields } from "../PortfolioDialog/PortfolioDialogInterfaces";
import { GlobalContext } from "@/pages/Portfolio";
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
