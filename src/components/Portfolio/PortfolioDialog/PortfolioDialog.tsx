import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeAvatar } from "./ChangeAvatar";
import { UpsertPortfolio } from "./UpsertPortfolio";
import { useContext, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { avatarBackground, AvatarValues, emojis } from "./AvatarAssets";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/pages/Portfolio";

export default function PortfolioDialog({
  editPortfolio,
  ...buttonProps
}: {
  editPortfolio?: boolean;
} & React.ComponentProps<typeof Button>) {
  const [isAvatarDialogPage, setIsAvatarDialogPage] = useState(false);
  const { portfolio } = useContext(GlobalContext);
  const [portfolioIcon, setPortfolioIcon] = useState<AvatarValues>(
    editPortfolio && portfolio
      ? { color: portfolio.color, avatar: portfolio.avatar }
      : {
          color:
            avatarBackground[
              Math.floor(Math.random() * avatarBackground.length)
            ],
          avatar: emojis[Math.floor(Math.random() * emojis.length)],
        }
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const changeProfileAvatar = (avatarProperties: AvatarValues) => {
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
        <Button
          aria-label={editPortfolio ? "Edit Portfolio" : "Create Portfolio"}
          {...buttonProps}
        >
          {editPortfolio ? (
            <>
              <Pencil size={18} className="mr-4" />
              Edit Portfolio
            </>
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
            ) : editPortfolio ? (
              "Edit Portfolio"
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
          <UpsertPortfolio
            editPortfolio={editPortfolio}
            onPortfolioCreate={() => setIsDialogOpen(false)}
            iconProperties={portfolioIcon}
            changeCurrentDialogPage={changeCurrentDialogPage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
