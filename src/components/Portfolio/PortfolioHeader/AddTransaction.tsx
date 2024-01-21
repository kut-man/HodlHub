import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoinSelect } from "./CoinSelect";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./DatePicker";
import { PiNotePencilDuotone } from "react-icons/pi";
import FeeIcon from "./FeeIcon";

export default function AddTransaction() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" aria-label="Add Transaction">
          + Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card className="p-1">
            <Button size="sm" className="w-1/2">
              Buy
            </Button>
            <Button size="sm" className="w-1/2">
              Sell
            </Button>
          </Card>
          <CoinSelect />
          <div className="flex gap-2">
            <div className="w-1/2">
              <Label htmlFor="name" className="text-right">
                Quantitiy
              </Label>
              <Input id="name" placeholder="0.00" className="col-span-3" />
            </div>
            <div className="w-1/2">
              <Label htmlFor="name" className="text-right">
                Price Per Coin
              </Label>
              <Input id="name" defaultValue="41122.12" className="col-span-3" />
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <DatePicker />
            <Button>
              <div className="flex gap-1">
                <FeeIcon />
                <Label>Fee</Label>
              </div>
            </Button>
            <Button>
              <div className="flex gap-1">
                <PiNotePencilDuotone />
                <Label>Notes</Label>
              </div>
            </Button>
          </div>
          <Card>
            <CardHeader className="py-4">
              <CardDescription>Total Spend</CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle className="font-bold">$100</CardTitle>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button className="w-full" size="lg" type="submit">
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
