import { BsThreeDots } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import RemovePortfolioDialog from "./RemovePortfolioDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PortfolioDialog from "../PortfolioList/PortfolioDialog";
import { Pencil } from "lucide-react";

export function PortfolioActions() {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <Popover onOpenChange={(open) => setOpenPopover(open)} open={openPopover}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <BsThreeDots />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-1 flex flex-col gap-1">
        <RemovePortfolioDialog
          className="justify-start"
          variant="ghost"
          onClose={() => setOpenPopover(false)}
        />
        <PortfolioDialog
          label={
            <>
              <Pencil size={18} className="mr-4" />
              Edit
            </>
          }
          size="sm"
          className="justify-start"
          variant="ghost"
        />
      </PopoverContent>
    </Popover>
  );
}
