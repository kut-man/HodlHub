import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditProfile } from "./EditProfile";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { ChangeAvatar } from "./ChangeAvatar";
import { useAuth } from "@/lib/useAuth";
import { Holder } from "@/lib/AuthProvider";

export default function ProfileDialog({
  ...buttonProps
}: {} & React.ComponentProps<typeof Button>) {
  const { data } = useAuth() as { data: Holder };

  const [isAvatarDialogPage, setIsAvatarDialogPage] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [profileUrl, setProfileUrl] = useState(data.avatar);

  const changeProfileAvatar = (url: string) => {
    setProfileUrl(url);
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
          variant="ghost"
          className="justify-start w-full"
          {...buttonProps}
        >
          Settings
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
              "Edit My Profile"
            )}
          </DialogTitle>
        </DialogHeader>
        {isAvatarDialogPage ? (
          <ChangeAvatar
            avatarUrl={profileUrl}
            changeProfileAvatar={changeProfileAvatar}
          />
        ) : (
          <EditProfile
            profileUrl={profileUrl}
            onProfileEdit={() => setIsDialogOpen(false)}
            changeCurrentDialogPage={changeCurrentDialogPage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
