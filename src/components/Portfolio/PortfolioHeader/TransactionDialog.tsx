import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionCard from "./TransactionCard/TransactionCard";
import TransactionTypes from "./TransactionTypesEnum";
import { useState } from "react";

export default function TransactionDialog({ children }: { children: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog onOpenChange={(open) => setIsDialogOpen(open)} open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" aria-label="Add Transaction">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs className="mt-6" defaultValue="buy">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          <TabsContent value="buy">
            <TransactionCard
              onSuccess={() => setIsDialogOpen(false)}
              type={TransactionTypes.BUY}
            />
          </TabsContent>
          <TabsContent value="sell">
            <TransactionCard
              onSuccess={() => setIsDialogOpen(false)}
              type={TransactionTypes.SELL}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
