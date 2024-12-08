import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import PortfolioDialog from "./PortfolioDialog";
import PortfolioItem from "./PortfolioItem";
import { PortfolioFields } from "./PortfolioDialog/PortfolioDialogInterfaces";

export default function Portfolio({
  changePortfolio,
  data,
}: {
  changePortfolio: (portfolioId: number, portfolioName: string) => void;
  data: PortfolioFields[];
}) {
  return (
    <Card className="border-none shadow-none max-lg:w-full lg:min-w-[340px]">
      <CardHeader>
        <CardTitle className="text-lg">My portfolio</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col py-2">
        {data.map((portfolio) => (
          <PortfolioItem
            onClick={changePortfolio}
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
