import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2, TriangleAlert } from "lucide-react";
import { PORTFOLIO_URL } from "@/lib/api";
import { ErrorResponse } from "@/layout/Header/HeaderTypes";
import { GlobalContext } from "@/pages/Portfolio";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const removeAsset = async (portfolioId: number, assetTicker: string) => {
  const response = await fetch(
    `${PORTFOLIO_URL}/${portfolioId}/${assetTicker}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const { message }: ErrorResponse = await response.json();
    const errorMessage = message ? message : "Something went wrong!";
    console.error("Failed to remove asset!");
    throw Error(errorMessage);
  }
};

export default function RemoveAssetDialog({
  assetTicker,
  onClose,
  ...buttonProps
}: {
  assetTicker: string;
  onClose?: () => void;
} & React.ComponentProps<typeof Button>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { portfolio } = useContext(GlobalContext);

  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError, reset } = useMutation({
    mutationFn: () => removeAsset(portfolio?.id as number, assetTicker),
    onSuccess: () => {
      handleOpenChange(false);
      toast.warning("Asset has been removed");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["historyChart"] });
    },
  });

  useEffect(() => {
    return reset;
  }, [isDialogOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsDialogOpen(false);
      if (onClose) {
        onClose();
      }
    } else {
      setIsDialogOpen(true);
    }
  };

  return (
    <Dialog onOpenChange={(open) => handleOpenChange(open)} open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          aria-label={`Remove Asset ${assetTicker}`}
          {...buttonProps}
        >
          <Trash2 size={18} className="mr-4" />
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 pt-12 flex flex-col gap-4 items-center">
        <TriangleAlert color="rgb(234, 57, 67)" size={40} />

        <Label className="text-xl">{`Remove ${assetTicker}?`}</Label>
        <Label className="mb-4">
          All transactions associated with this coin will be removed.
        </Label>
        <Button
          disabled={isPending}
          className="w-full"
          size="lg"
          aria-label={`Remove Asset ${assetTicker}`}
          onClick={() => mutate()}
        >
          {isPending ? <Loader2 className="h-8 w-8 animate-spin" /> : "Remove"}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          size="lg"
          aria-label={`Cancel Asset ${assetTicker} removal`}
          onClick={() => handleOpenChange(false)}
        >
          Cancel
        </Button>
        {isError && (
          <Label className="font-normal text-red-600">*{error.message}</Label>
        )}
      </DialogContent>
    </Dialog>
  );
}
