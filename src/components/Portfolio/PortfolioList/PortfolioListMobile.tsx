import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useContext, useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PortfolioItem from "./PortfolioItem";
import { PortfolioListProps } from "./PortfolioList";
import PortfolioDialog from "../PortfolioDialog/PortfolioDialog";
import { GlobalContext } from "@/pages/Portfolio";
import { Button } from "@/components/ui/button";
import { Flex } from "@tremor/react";
import PortfolioIcon from "./PortfolioIcon";
import { Label } from "@/components/ui/label";
import BalanceLabel from "../PerformanceTiles/Labels/BalanceLabel";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function PortfolioListMobile({
  switchPortfolio,
  data,
}: PortfolioListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { portfolio } = useContext(GlobalContext);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsDialogOpen(false);
    } else {
      setIsDialogOpen(true);
    }
  };

  const activePortfolio = data.find((item) => item.id === portfolio?.id);

  if (!activePortfolio) return null;

  return (
    <div className="block lg:hidden w-full">
      <Dialog
        onOpenChange={(open) => handleOpenChange(open)}
        open={isDialogOpen}
      >
        <DialogTrigger asChild>
          <>
            <Separator />
            <Button
              aria-label="Select Portfolio"
              variant={"ghost"}
              className="w-full h-14 px-6 py-0 hover:bg-transparent"
              onClick={() => setIsDialogOpen(true)}
            >
              <Flex justifyContent="start">
                <PortfolioIcon
                  color={activePortfolio.color}
                  avatar={activePortfolio.avatar}
                  className="ml-0"
                />
                <Flex
                  justifyContent="start"
                  alignItems="start"
                  flexDirection="col"
                >
                  <Label className="cursor-pointer text-left leading-2 text-base">
                    {activePortfolio.name}
                  </Label>
                  <BalanceLabel
                    className="cursor-pointer text-left leading-2 font-normal text-gray-500"
                    balance={activePortfolio.totalAmount}
                  />
                </Flex>
                <ChevronDown />
              </Flex>
            </Button>
            <Separator />
          </>
        </DialogTrigger>
        <DialogContent className="h-3/4 w-96">
          <VisuallyHidden.Root asChild>
            <DialogTitle> Add Transaction Dialog </DialogTitle>
          </VisuallyHidden.Root>
          <Card
            data-testid="portfolio-list-dialog"
            className="h-full overflow-auto border-none shadow-none"
          >
            <CardHeader className="p-0">
              <CardTitle className="text-lg">My portfolios</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col p-0">
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
