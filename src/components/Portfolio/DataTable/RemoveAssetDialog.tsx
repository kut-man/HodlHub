import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Loader2, TriangleAlert } from "lucide-react";
import { PORTFOLIO_URL } from "@/lib/api";
import { ErrorResponse } from "@/layout/Header/HeaderTypes";
import { GlobalContext } from "@/pages/Portfolio";
import { useMutation } from "@tanstack/react-query";

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
    const errorMessage = message;
    console.error("Failed to remove asset!");
    throw Error(errorMessage);
  }
};

export default function RemoveAssetDialog({
  assetTicker,
  ...restProps
}: {
  assetTicker: string;
} & React.ComponentProps<typeof Button>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { portfolioId } = useContext(GlobalContext);

  const { mutate, isPending, error, isError, reset } = useMutation({
    mutationFn: () => removeAsset(portfolioId as number, assetTicker),
    onSuccess: () => setIsDialogOpen(false),
  });

  useEffect(() => {
    return reset;
  }, [isDialogOpen]);

  return (
    <Dialog onOpenChange={(open) => setIsDialogOpen(open)} open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          aria-label={`Remove Asset ${assetTicker}`}
          {...restProps}
        >
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 pt-12 flex flex-col gap-4 items-center">
        <TriangleAlert color="rgb(234, 57, 67)" size={40} />

        <Label className="text-xl">{`Remove ${assetTicker}`}</Label>
        <Label className="mb-4">
          All transactions associated with this coin will be removed.
        </Label>
        <Button
          disabled={isPending}
          className="w-full"
          size="lg"
          aria-label={`Remove Asset ${assetTicker}`}
          onClick={() => mutate()}
          {...restProps}
        >
          {isPending ? <Loader2 className="h-8 w-8 animate-spin" /> : "Remove"}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          size="lg"
          aria-label={`Remove Asset ${assetTicker}`}
          onClick={() => setIsDialogOpen(false)}
          {...restProps}
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
