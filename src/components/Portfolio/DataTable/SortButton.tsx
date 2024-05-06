import { Button } from "@/components/ui/button";
import { HeaderContext } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { AssetsInfo } from "./DataTableInterfaces";


export default function sortableHeaderHOF(label: string) {
  return ({ column }: HeaderContext<AssetsInfo, unknown>) => (
    <Button
      variant="ghost"
      size="sm"
      className="p-0"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
