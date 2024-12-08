import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeAvatar } from "./PortfolioDialog/ChangeAvatar";
import { CreatePortfolio } from "./PortfolioDialog/CreatePortfolio";
import { ReactNode, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import {
  avatarBackground,
  avatarValues,
  emojis,
} from "./PortfolioDialog/AvatarAssets";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortfolioDialog({
  label,
  ...buttonProps
}: { label?: ReactNode } & React.ComponentProps<typeof Button>) {
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
        <Button aria-label="Create Portfolio" {...buttonProps}>
          {label ? (
            label
          ) : (
            <>
              <Plus size={18} className="mr-2" />
              Create Portfolio
            </>
          )}
        </Button>
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
