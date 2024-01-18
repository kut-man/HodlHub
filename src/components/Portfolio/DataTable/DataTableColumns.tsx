import { BsThreeDots } from "react-icons/bs";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Payment = {
  name: string;
  price: string;
  hourChange: number;
  dayChange: number;
  weekChange: number;
  holdings: string;
  averageBuyPrice: string;
  profitLoss: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 lowercase">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "hourChange",
    header: () => <div className="text-right">1h%</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("hourChange"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "dayChange",
    header: () => <div className="text-right">24h%</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("dayChange"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "weekChange",
    header: () => <div className="text-right">7d%</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("weekChange"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "holdings",
    header: () => <div className="text-right">Holdings</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("holdings")}</div>
      );
    },
  },
  {
    accessorKey: "averageBuyPrice",
    header: () => <div className="text-right">Avg.Buy Price</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("averageBuyPrice")}
        </div>
      );
    },
  },
  {
    accessorKey: "profitLoss",
    header: () => <div className="text-right">Proft/Loss</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("profitLoss")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div>Actions</div>,
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
