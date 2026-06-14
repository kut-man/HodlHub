import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import AvatarWithSkeleton from "@/components/ui/avatar-with-skeleton";
import { avatarUrls } from "./avatar-assets";
import { CloudUpload } from "lucide-react";
import Flex from "@/components/ui/flex.tsx";

export function ChangeAvatar({
  changeProfileAvatar,
  avatarUrl,
}: {
  changeProfileAvatar: (url: string) => void;
  avatarUrl: string;
}) {
  const [avatar, setAvatar] = useState(avatarUrl);
  return (
    <>
      <p className="text-gray-500">
        Let's face it, we're all good lookin' people 😎 so upload your best
        profile photo. You can also redeem avatars from our Rewards page.
      </p>
      <p>Custom Avatar</p>
      <Flex className="gap-8" flexDirection="col">
        <Flex className="items-center justify-start gap-4">
          <AvatarWithSkeleton
            className="h-16 w-16"
            alt="Profile Avatar"
            src={avatar}
          />
          <Button>
            <CloudUpload size={18} className="mr-2" />
            Upload
          </Button>
        </Flex>

        <div className="flex flex-wrap justify-between gap-y-6">
          {avatarUrls.map((url) => (
            <span onClick={() => setAvatar(url)}>
              <AvatarWithSkeleton
                key={url}
                className={`h-14 w-14 border-2 ${
                  avatar === url ? "border-blue-500" : ""
                }`}
                alt="Your Avatar"
                src={url}
              />
            </span>
          ))}
        </div>
      </Flex>
      <DialogFooter>
        <Button
          onClick={() => changeProfileAvatar(avatar)}
          className="w-full"
          size="lg"
          type="submit"
        >
          Save
        </Button>
      </DialogFooter>
    </>
  );
}
