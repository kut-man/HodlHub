import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiPlus } from "react-icons/fi";

export function CreatePortfolio() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center">
          <FiPlus size={20} />
          <Label className="cursor-pointer text-base ml-1">
            Create Portfolio
          </Label>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Portfolio</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Label>Portfolio Avatar</Label>
          <div className="flex items-center justify-between">
            <Avatar className="h-16 w-16 m-2">
              <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
            </Avatar>
            <Button>Change</Button>
          </div>
          <Label htmlFor="name">Portfolio Name</Label>
          <Input id="name" className="col-span-3" />
        </div>
        <DialogFooter>
          <Button className="w-full" size="lg" type="submit">
            Create portfolio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
