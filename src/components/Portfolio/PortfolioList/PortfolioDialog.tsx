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
import { GoArrowLeft } from "react-icons/go";
import {
  avatarBackground,
  avatarValues,
  emojis,
} from "./PortfolioDialog/AvatarAssets";

export default function PortfolioDialog({ className }: { className?: string }) {
  const [isAvatarDialogPage, setIsAvatarDialogPage] = useState(false);
  const [portfolioIcon, setPortfolioIcon] = useState({
    color:
      avatarBackground[Math.floor(Math.random() * avatarBackground.length)],
    avatar: emojis[Math.floor(Math.random() * emojis.length)],
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const changeProfileAvatar = (avatarProperties: avatarValues) => {
    setPortfolioIcon(avatarProperties);
    changeCurrentDialogPage();
  };

  const toggleDialog = (open: boolean) => {
    if (open) setIsAvatarDialogPage(!open);
    setIsDialogOpen(open);
  };

  const changeCurrentDialogPage = () => {
    setIsAvatarDialogPage((prev) => !prev);
  };

  return (
    <Dialog onOpenChange={toggleDialog} open={isDialogOpen}>
      <DialogTrigger asChild>
        <button className={"flex items-center " + className}>
          <FiPlus size={20} />
          <Label className="cursor-pointer text-base ml-1">
            Create Portfolio
          </Label>
        </button>
      </DialogTrigger>
      <DialogContent className={"sm:max-w-[425px] duration-500"}>
        <DialogHeader>
          <DialogTitle className="flex gap-4">
            {isAvatarDialogPage ? (
              <>
                <GoArrowLeft onClick={changeCurrentDialogPage} />
                Change Avatar
              </>
            ) : (
              "Create Portfolio"
            )}
          </DialogTitle>
        </DialogHeader>
        {isAvatarDialogPage ? (
          <ChangeAvatar
            iconProperties={portfolioIcon}
            changeProfileAvatar={changeProfileAvatar}
          />
        ) : (
          <CreatePortfolio
            onPortfolioCreate={() => setIsDialogOpen(false)}
            iconProperties={portfolioIcon}
            changeCurrentDialogPage={changeCurrentDialogPage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
