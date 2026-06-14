import { Button } from "@/components/ui/button";
import { useState } from "react";
import RemovePortfolioDialog from "./remove-portfolio-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PortfolioDialog from "../portfolio-dialog/portfolio-dialog";
import { Ellipsis } from "lucide-react";

export function PortfolioActions() {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <Popover onOpenChange={(open) => setOpenPopover(open)} open={openPopover}>
      <PopoverTrigger asChild>
        <Button data-testid="portfolio-actions-menu-trigger" variant="outline">
          <Ellipsis size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col gap-1 p-1">
        <PortfolioDialog
          editPortfolio
          size="sm"
          className="justify-start"
          variant="ghost"
          onClose={() => setOpenPopover(false)}
        />
        <RemovePortfolioDialog
          className="justify-start"
          variant="ghost"
          onClose={() => setOpenPopover(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
