import { BsThreeDots } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useState } from "react";
import RemovePortfolioDialog from "./RemovePortfolioDialog";

export function PortfolioActions() {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <DropdownMenu
      open={openDropdown}
      onOpenChange={(open) => setOpenDropdown(open)}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" aria-label="Portfolio Settings">
          <BsThreeDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
            <Pencil />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy />
            <span>Duplicate</span>
          </DropdownMenuItem> */}
          <DropdownMenuItem>
            <RemovePortfolioDialog
              variant="ghost"
              className="w-full justify-start px-0"
              onClose={() => setOpenDropdown(false)}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
