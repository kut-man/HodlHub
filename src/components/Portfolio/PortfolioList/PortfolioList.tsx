import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import PortfolioDialog from "../PortfolioDialog/PortfolioDialog";
import PortfolioItem from "./PortfolioItem";
import { PortfolioListFields } from "../PortfolioDialog/PortfolioDialogInterfaces";
import { GlobalContext } from "@/pages/Portfolio";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface PortfolioListProps {
  switchPortfolio: (portfolioValues: GlobalContext["portfolio"]) => void;
  data: PortfolioListFields[];
}

export default function PortfolioList({
  switchPortfolio,
  data,
}: PortfolioListProps) {
  return (
    <div style={{ position: "sticky", top: 0 }}>
      <ScrollArea>
        <Card
          data-testid="portfolio-list-sidebar"
          className="h-screen border-none shadow-none max-lg:hidden lg:min-w-[340px]"
        >
          <CardHeader>
            <CardTitle className="text-lg">My portfolios</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col py-2">
            {data.map((portfolio) => (
              <PortfolioItem
                onClick={switchPortfolio}
                key={portfolio.id}
                {...portfolio}
              />
            ))}
          </CardContent>

          <CardFooter className="text-blue-600">
            <PortfolioDialog
              className="h-fit p-0 text-base"
              variant="ghost"
              size="sm"
            />
          </CardFooter>
        </Card>
      </ScrollArea>
    </div>
  );
}
