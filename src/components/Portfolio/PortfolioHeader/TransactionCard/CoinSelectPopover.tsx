import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CoinSelectPopover({
  Trigger,
  Content,
  open,
  onOpenChange
}: {
  Trigger: React.ReactNode;
  Content: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{Trigger}</PopoverTrigger>
      <PopoverContent className="p-0">{Content}</PopoverContent>
    </Popover>
  );
}
