import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="block w-full">
      <Dialog
        onOpenChange={(open) => handleOpenChange(open)}
        open={isDialogOpen}
      >
        <DialogTrigger asChild>
          <>
            <Separator orientation="horizontal" />
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
            <Separator orientation="horizontal" />
          </>
        </DialogTrigger>
        <DialogContent className="max-w-96">
          <DialogHeader>
            <DialogTitle> Portfolio </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-96">
            <Card
              data-testid="portfolio-list-dialog"
              className="h-full overflow-auto border-none shadow-none"
            >
              <CardContent className="flex flex-col p-0">
                {data.map((portfolio) => (
                  <PortfolioItem
                    onClick={() => {
                      setIsDialogOpen(false);
                      switchPortfolio(portfolio);
                    }}
                    key={portfolio.id}
                    {...portfolio}
                  />
                ))}
              </CardContent>
            </Card>
          </ScrollArea>

          <DialogFooter>
            <PortfolioDialog
              variant="outline"
              size="lg"
              className="text-base w-full"
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
