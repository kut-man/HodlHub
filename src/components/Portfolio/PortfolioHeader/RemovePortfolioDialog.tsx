import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2, TriangleAlert } from "lucide-react";
import { PORTFOLIO_URL } from "@/lib/api";
import { ErrorResponse } from "@/layout/Header/HeaderTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GlobalContext } from "@/pages/Portfolio";

const removePortfolio = async (portfolioId: number) => {
  const response = await fetch(`${PORTFOLIO_URL}/${portfolioId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    const { message }: ErrorResponse = await response.json();
    const errorMessage = message ? message : "Something went wrong!";
    console.error("Failed to remove portfolio!");
    throw Error(errorMessage);
  }
};

export default function RemovePortfolioDialog({
  onClose,
  ...buttonProps
}: {
  onClose: () => void;
} & React.ComponentProps<typeof Button>) {
  const { portfolio } = useContext(GlobalContext) as {
    portfolio: { id: number; name: string };
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError, reset } = useMutation({
    mutationFn: () => removePortfolio(portfolio.id),
    onSuccess: () => onClose(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });

  useEffect(() => {
    return reset;
  }, [open]);

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
          aria-label={`Remove Portfolio ${portfolio.name}`}
          {...buttonProps}
        >
          <Trash2 size={18} className="mr-4" />
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 pt-12 flex flex-col gap-4 items-center">
        <TriangleAlert color="rgb(234, 57, 67)" size={40} />

        <Label className="text-xl">{`Remove ${portfolio.name} portfolio?`}</Label>
        <Label className="mb-4">
          All coins and transactions in this portfolio will be removed.
        </Label>
        <Button
          disabled={isPending}
          className="w-full"
          size="lg"
          aria-label={`Remove Portfolio ${portfolio.name}`}
          onClick={() => mutate()}
        >
          {isPending ? <Loader2 className="h-8 w-8 animate-spin" /> : "Remove"}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          size="lg"
          aria-label={`Cancel Portfolio ${portfolio.name} removal`}
          onClick={() => onClose()}
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
