import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import PortfolioDialog from "./PortfolioDialog";
import { useQuery } from "@tanstack/react-query";
import { PORTFOLIO_URL } from "@/api";
import PortfolioItem from "./PortfolioItem";
import { PortfolioFields } from "./PortfolioDialog/PortfolioDialogInterfaces";
import { Skeleton } from "@/components/ui/skeleton";

export default function Portfolio() {
  const {
    data: portfolios,
    isPending,
  } = useQuery<PortfolioFields[]>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const response = await fetch(PORTFOLIO_URL, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw Error("Portfolio list fetch failed!");
      return await response.json();
    },
  });

  return (
    <Card className="border-none shadow-none max-lg:w-full lg:min-w-[340px]">
      <CardHeader>
        <CardTitle className="text-lg">My portfolio</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col py-2">
        {isPending ? (
          <Skeleton className="w-full h-14 rounded-md" />
        ) : (
          portfolios?.map((portfolio) => (
            <PortfolioItem key={portfolio.id} {...portfolio} />
          ))
        )}
      </CardContent>

      <CardFooter className="text-blue-600">
        <PortfolioDialog />
      </CardFooter>
    </Card>
  );
}
