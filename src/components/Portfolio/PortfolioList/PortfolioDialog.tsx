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
import { avatarBackground, avatarValues, emojis } from "./PortfolioDialog/AvatarAssets";

export default function PortfolioDialog() {
  const [isAvatarDialogPage, setIsAvatarDialogPage] = useState(false);
  const [portfolioAvatar, setPortfolioAvatar] = useState({
    color:
      avatarBackground[Math.floor(Math.random() * avatarBackground.length)],
    logo: emojis[Math.floor(Math.random() * emojis.length)],
  });
  const changeProfileAvatar = (avatarProperties: avatarValues) => {
    setPortfolioAvatar(avatarProperties);
    changeCurrentDialogPage();
  };
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
      <DialogContent className={`sm:max-w-[425px] duration-500 h-${isAvatarDialogPage ? '80' : '96'}`}>
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
            avatarProperties={portfolioAvatar}
            changeProfileAvatar={changeProfileAvatar}
          />
        ) : (
          <CreatePortfolio
            avatarProperties={portfolioAvatar}
            changeCurrentDialogPage={changeCurrentDialogPage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
