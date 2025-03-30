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
import { useAuthContext } from "@/lib/useAuthContext";

export default function ProfileDialog({
  onClose,
  ...buttonProps
}: { onClose?: () => void } & React.ComponentProps<typeof Button>) {
  const { data } = useAuthContext();

  const [isAvatarDialogPage, setIsAvatarDialogPage] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [profileUrl, setProfileUrl] = useState(data.avatar);

  const [profileName, setProfileName] = useState(data.name);

  const changeProfileAvatar = (url: string) => {
    setProfileUrl(url);
    changeCurrentDialogPage();
  };

  const toggleDialog = (open: boolean) => {
    if (open) setIsAvatarDialogPage(!open);
    if (!open && onClose) onClose();
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
            formData={{ profileUrl, profileName }}
            onNameChange={(newName: string) => setProfileName(newName)}
            onProfileEdit={() => toggleDialog(false)}
            changeCurrentDialogPage={changeCurrentDialogPage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
