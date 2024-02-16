import { BsThreeDots } from "react-icons/bs";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProfitLossLabel from "../PerformanceTiles/Labels/ProfitLossLabel";
import BalanceLabel from "../PerformanceTiles/Labels/BalanceLabel";
import PerformanceLabel from "../PerformanceTiles/Labels/PerformanceLabel";
import SortableHeaderHOF from "./SortButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

export interface Coin {
  name: string;
  ticker: string;
  iconURL: string;
}

export type AssetsInfo = {
  name: Coin;
  price: number;
  hourChange: number;
  dayChange: number;
  weekChange: number;
  holdings: number;
  averageBuyPrice: number;
  profitLoss: number;
};

const createChangeColumn = (
  accessorKey: keyof AssetsInfo,
  label: string
): ColumnDef<AssetsInfo> => ({
  accessorKey,
  header: SortableHeaderHOF(label),
  cell: ({ row }: CellContext<AssetsInfo, unknown>) => (
    <div className="flex items-center justify-end">
      <PerformanceLabel
        hideable={false}
        performance={row.getValue(accessorKey)}
      />
    </div>
  ),
});

export const columns: ColumnDef<AssetsInfo>[] = [
  {
    accessorKey: "name",
    header: SortableHeaderHOF("Name"),
    meta: {
      left: true,
    },
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <Avatar className="h-6 w-6">
          <AvatarImage
            alt={`${(row.getValue("name") as Coin).name}'s Icon`}
            src={(row.getValue("name") as Coin).iconURL}
          />
        </Avatar>
        <div className="flex max-md:flex-col gap-2 md:items-center">
          <Label className="font-semibold">
            {(row.getValue("name") as Coin).name}
          </Label>
          <Label className="text-gray-500">
            {(row.getValue("name") as Coin).ticker}
          </Label>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: SortableHeaderHOF("Price"),
    cell: ({ row }) => {
      return (
        <div className="text-right lowercase">
          <BalanceLabel hideable={false} balance={row.getValue("price")} />
        </div>
      );
    },
  },
  createChangeColumn("hourChange", "1h%"),
  createChangeColumn("dayChange", "24h%"),
  createChangeColumn("weekChange", "7d%"),
  {
    accessorKey: "holdings",
    header: SortableHeaderHOF("Holdings"),
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          <BalanceLabel balance={row.getValue("holdings")} />
        </div>
      );
    },
  },
  {
    accessorKey: "averageBuyPrice",
    header: SortableHeaderHOF("Avg.Buy Price"),
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          <BalanceLabel balance={row.getValue("averageBuyPrice")} />
        </div>
      );
    },
  },
  {
    accessorKey: "profitLoss",
    header: SortableHeaderHOF("Profit/Loss"),
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          <ProfitLossLabel
            className="text-right text-black-500"
            profitLoss={row.getValue("profitLoss")}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-left">Actions</div>,
    cell: () => {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <BsThreeDots />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 flex flex-col gap-2">
            <Button>Add Transaction</Button>
            <Button>View Transactions</Button>
            <Button>Remove Asset</Button>
          </PopoverContent>
        </Popover>
      );
    },
  },
];
