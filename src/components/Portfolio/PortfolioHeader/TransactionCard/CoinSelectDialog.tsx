import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CoinSelectDialog({
  Trigger,
  Content,
  open,
  onOpenChange,
}: {
  Trigger: React.ReactNode;
  Content: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="h-screen">
        <DialogHeader>
          <DialogTitle>Select Coin</DialogTitle>
        </DialogHeader>
        {Content}
        <DialogFooter className="w-full">
          <DialogClose className="w-full">
            <Button
              variant="outline"
              size="lg"
              className="text-base w-full"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
