import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FiPlus } from "react-icons/fi";
import { ChangeAvatar } from "./PortfolioDialog/ChangeAvatar";
import { CreatePortfolio } from "./PortfolioDialog/CreatePortfolio";
import { useState } from "react";

export default function PortfolioDialog() {
  const [isAvatarDialogPage, setIsAvatarDialogPage] = useState(false);
  const changeCurrentDialogPage = () => {
    setIsAvatarDialogPage((prev) => !prev);
  };
  return (
    <Dialog onOpenChange={(open) => setIsAvatarDialogPage(!open)}>
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
          <DialogTitle>
            {isAvatarDialogPage ? "Change Avatar" : "Create Portfolio"}
          </DialogTitle>
        </DialogHeader>
        {isAvatarDialogPage ? (
          <ChangeAvatar changeCurrentDialogPage={changeCurrentDialogPage} />
        ) : (
          <CreatePortfolio changeCurrentDialogPage={changeCurrentDialogPage} />
        )}
      </DialogContent>
    </Dialog>
  );
}
