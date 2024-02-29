import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface PortfolioDialogProps {
  changeCurrentDialogPage: () => void;
}

export function CreatePortfolio({
  changeCurrentDialogPage,
}: PortfolioDialogProps) {
  return (
    <>
      <div className="flex flex-col gap-4 py-4">
        <Label>Portfolio Avatar</Label>
        <div className="flex items-center justify-between">
          <Avatar className="h-16 w-16 m-2">
            <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
          </Avatar>
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
