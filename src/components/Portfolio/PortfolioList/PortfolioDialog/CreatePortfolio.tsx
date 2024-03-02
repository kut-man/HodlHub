import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PortfolioDialogProps } from "./PortfolioDialogInterfaces";

export function CreatePortfolio({
  changeCurrentDialogPage,
  avatarProperties,
}: PortfolioDialogProps) {
  return (
    <>
      <div className="flex flex-col gap-4 py-4">
        <Label>Portfolio Avatar</Label>
        <div className="flex items-center justify-between">
          <div
            className={`rounded-full flex justify-center items-center h-16 w-16 bg-${avatarProperties.color}-500`}
          >
            <span className="mb-1 text-4xl">{avatarProperties.logo}</span>
          </div>
          <Button onClick={changeCurrentDialogPage}>Change</Button>
        </div>
        <Label htmlFor="name">Portfolio Name</Label>
        <Input id="name" className="col-span-3" />
      </div>
      <DialogFooter>
        <Button className="w-full" size="lg" type="submit">
          Create portfolio
        </Button>
      </DialogFooter>
    </>
  );
}
