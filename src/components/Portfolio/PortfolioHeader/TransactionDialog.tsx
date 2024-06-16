import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionCard, { TransactionTypes } from "./TransactionCard";

export default function TransactionDialog({ children }: { children: string }) {
  return (
    <Dialog>
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
            <TransactionCard type={TransactionTypes.BUY} />
          </TabsContent>
          <TabsContent value="sell">
            <TransactionCard type={TransactionTypes.SELL} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
