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
import { Label } from "@/components/ui/label";
import AddTransactionDialog from "../PortfolioHeader/AddTransactionDialog";
import AvatarWithSkeleton from "@/components/ui/AvatarWithSkeleton";
import { AssetsInfo, Coin } from "./DataTableInterfaces";
import RemoveAssetDialog from "./RemoveAssetDialog";
import { useState } from "react";
import { File, Plus } from "lucide-react";

const createChangeColumn = (
  accessorKey: keyof AssetsInfo,
  label: string
): ColumnDef<AssetsInfo> => ({
  accessorKey,
  header: SortableHeaderHOF(label),
  cell: ({ row }: CellContext<AssetsInfo, unknown>) => (
    <div className="flex items-center justify-end">
      <PerformanceLabel
        hidable={false}
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
        <AvatarWithSkeleton
          className="h-6 w-6"
          alt={`${(row.getValue("name") as Coin).name}'s Icon`}
          src={(row.getValue("name") as Coin).iconURL}
        />
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
          <BalanceLabel hidable={false} balance={row.getValue("price")} />
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
        <div className="flex flex-col items-end gap-1 text-right font-medium">
          <BalanceLabel
            balance={(row.getValue("holdings") as AssetsInfo["holdings"]).value}
          />
          <Label className="text-xs text-slate-500">
            {(row.getValue("holdings") as AssetsInfo["holdings"]).amount}
          </Label>
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
        <div className="flex flex-col items-end gap-1 text-right font-medium">
          <ProfitLossLabel
            className="text-right text-black-500"
            profitLoss={
              (row.getValue("profitLoss") as AssetsInfo["profitLoss"]).value
            }
          />
          <PerformanceLabel
            className="text-xs"
            performance={
              (row.getValue("profitLoss") as AssetsInfo["profitLoss"]).percent
            }
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-left">Actions</div>,
    cell: ({ row }) => {
      const [openPopover, setOpenPopover] = useState(false);
      return (
        <Popover
          onOpenChange={(open) => setOpenPopover(open)}
          open={openPopover}
        >
          <PopoverTrigger asChild>
            <Button className="rounded-full p-0 w-10 h-10" variant="ghost">
              <BsThreeDots size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-1 flex flex-col gap-1">
            <AddTransactionDialog
              label={
                <>
                  <Plus size={18} className="mr-4" />
                  Add Transaction
                </>
              }
              className="justify-start"
              variant="ghost"
              defaultSelectedCoinTicker={(row.getValue("name") as Coin).ticker}
              onClose={() => setOpenPopover(false)}
            />
            <Button size="sm" className="justify-start" variant="ghost">
              <File size={18} className="mr-4" />
              View Transactions
            </Button>
            <RemoveAssetDialog
              className="justify-start"
              variant="ghost"
              assetTicker={(row.getValue("name") as Coin).ticker}
              onClose={() => setOpenPopover(false)}
            />
          </PopoverContent>
        </Popover>
      );
    },
  },
];
