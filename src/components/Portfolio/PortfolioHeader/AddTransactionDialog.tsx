import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionCard from "./TransactionCard/TransactionCard";
import TransactionTypes from "./TransactionTypesEnum";
import { useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function AddTransactionDialog({
  label = "Add Transaction",
  defaultSelectedCoinTicker,
  onClose,
  ...restProps
}: {
  label?: string;
  defaultSelectedCoinTicker?: string;
  onClose?: () => void;
} & React.ComponentProps<typeof Button>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsDialogOpen(false);
      if (onClose) {
        onClose();
      }
    } else {
      setIsDialogOpen(true);
    }
  };

  return (
    <Dialog onOpenChange={(open) => handleOpenChange(open)} open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" aria-label="Add Transaction" {...restProps}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <VisuallyHidden.Root asChild>
          <DialogTitle> Add Transaction Dialog </DialogTitle>
        </VisuallyHidden.Root>
        <Tabs className="mt-6" defaultValue="buy">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          <TabsContent value="buy">
            <TransactionCard
              defaultSelectedCoinTicker={defaultSelectedCoinTicker}
              onSuccess={() => handleOpenChange(false)}
              type={TransactionTypes.BUY}
            />
          </TabsContent>
          <TabsContent value="sell">
            <TransactionCard
              defaultSelectedCoinTicker={defaultSelectedCoinTicker}
              onSuccess={() => handleOpenChange(false)}
              type={TransactionTypes.SELL}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
