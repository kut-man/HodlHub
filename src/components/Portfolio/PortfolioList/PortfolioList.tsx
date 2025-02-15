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

interface PortfolioListProps {
  switchPortfolio: (portfolioValues: GlobalContext["portfolio"]) => void;
  data: PortfolioListFields[];
}

export default function PortfolioList({
  switchPortfolio,
  data,
}: PortfolioListProps) {
  return (
    <Card className="border-none shadow-none max-lg:w-full lg:min-w-[340px]">
      <CardHeader>
        <CardTitle className="text-lg">My portfolio</CardTitle>
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
  );
}
