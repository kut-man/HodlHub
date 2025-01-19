import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Flex } from "@tremor/react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import AvatarWithSkeleton from "@/components/ui/AvatarWithSkeleton";
import { avatarUrls } from "./AvatarAssets";
import { CloudUpload } from "lucide-react";

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
      <Label className="text-gray-500">
        Let's face it, we're all good lookin' people 😎 so upload your best
        profile photo. You can also redeem avatars from our Rewards page.
      </Label>
      <Label>Custom Avatar</Label>
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

        <div className="flex gap-y-6 flex-wrap justify-between">
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
