import type { CellContext, ColumnDef } from "@tanstack/react-table";
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
import AddTransactionDialog from "../PortfolioHeader/AddTransactionDialog";
import AvatarWithSkeleton from "@/components/ui/AvatarWithSkeleton";
import type { AssetsInfo, Coin } from "./DataTableInterfaces";
import RemoveAssetDialog from "./RemoveAssetDialog";
import { useState } from "react";
import { Ellipsis, Plus } from "lucide-react";
import AmountLabel from "../PerformanceTiles/Labels/AmountLabel";

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
      <div className="flex items-center gap-2">
        <AvatarWithSkeleton
          className="h-6 w-6"
          alt={`${(row.getValue("name") as Coin).name}'s Icon`}
          src={(row.getValue("name") as Coin).iconURL}
        />
        <div className="flex gap-2 max-md:flex-col md:items-center">
          <span className="font-semibold">
            {(row.getValue("name") as Coin).name}
          </span>
          <span className="text-gray-500">
            {(row.getValue("name") as Coin).ticker}
          </span>
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
          <AmountLabel
            className="text-xs text-slate-500"
            amount={(row.getValue("holdings") as AssetsInfo["holdings"]).amount}
          />
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
            className="text-black-500 text-right"
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
            <Button
              data-testid="asset-actions-menu-trigger"
              className="h-10 w-10 rounded-full p-0"
              variant="ghost"
            >
              <Ellipsis size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-52 flex-col gap-1 p-1">
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
              size="sm"
            />
            {/* <Button size="sm" className="justify-start" variant="ghost">
              <File size={18} className="mr-4" />
              View Transactions
            </Button> */}
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
