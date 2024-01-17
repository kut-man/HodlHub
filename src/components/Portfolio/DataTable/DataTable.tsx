import { BsThreeDots } from "react-icons/bs";
import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const data: Payment[] = [
  {
    name: "Matyukon",
    price: "$0.35",
    hourChange: 59,
    dayChange: 2,
    weekChange: 24,
    holdings: "$0.12",
    averageBuyPrice: "$0.20",
    profitLoss: "$5.64",
  },
  {
    name: "Chaloner",
    price: "$7.35",
    hourChange: 13,
    dayChange: 77,
    weekChange: 68,
    holdings: "$2.19",
    averageBuyPrice: "$4.60",
    profitLoss: "$3.55",
  },
  {
    name: "Skill",
    price: "$1.81",
    hourChange: 31,
    dayChange: 23,
    weekChange: 72,
    holdings: "$7.63",
    averageBuyPrice: "$9.70",
    profitLoss: "$7.23",
  },
  {
    name: "Coda",
    price: "$4.86",
    hourChange: 30,
    dayChange: 5,
    weekChange: 74,
    holdings: "$9.73",
    averageBuyPrice: "$6.40",
    profitLoss: "$0.97",
  },
  {
    name: "Fretter",
    price: "$3.89",
    hourChange: 22,
    dayChange: 66,
    weekChange: 36,
    holdings: "$8.13",
    averageBuyPrice: "$8.33",
    profitLoss: "$2.78",
  },
  {
    name: "Phear",
    price: "$7.97",
    hourChange: 55,
    dayChange: 28,
    weekChange: 18,
    holdings: "$4.82",
    averageBuyPrice: "$6.46",
    profitLoss: "$7.37",
  },
  {
    name: "Laird",
    price: "$6.85",
    hourChange: 62,
    dayChange: 23,
    weekChange: 25,
    holdings: "$8.84",
    averageBuyPrice: "$7.42",
    profitLoss: "$4.48",
  },
  {
    name: "Larose",
    price: "$1.97",
    hourChange: 94,
    dayChange: 73,
    weekChange: 87,
    holdings: "$2.08",
    averageBuyPrice: "$0.07",
    profitLoss: "$8.93",
  },
  {
    name: "Itzcak",
    price: "$2.74",
    hourChange: 8,
    dayChange: 73,
    weekChange: 85,
    holdings: "$9.24",
    averageBuyPrice: "$3.07",
    profitLoss: "$7.65",
  },
  {
    name: "Waplinton",
    price: "$8.31",
    hourChange: 83,
    dayChange: 68,
    weekChange: 85,
    holdings: "$7.48",
    averageBuyPrice: "$1.29",
    profitLoss: "$5.16",
  },
];

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

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card className="w-full border-none shadow-md">
      <CardHeader className="pb-2 pt-4">
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
