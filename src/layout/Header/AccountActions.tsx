import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Flex } from "@tremor/react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AvatarWithSkeleton from "@/components/ui/AvatarWithSkeleton";
import { LOGOUT_URL } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import ProfileDialog from "./ProfileDialog/ProfileDialog";

export default function AccountActions() {
  const { refetchUser, data } = useAuth();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      const response = await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        queryClient.clear();
        refetchUser();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <AvatarWithSkeleton
          className="h-8 w-8 m-2"
          alt="Avatar"
          src={data.avatar}
        />
      </PopoverTrigger>
      <PopoverContent
        className="p-1"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Flex justifyContent="start">
          <AvatarWithSkeleton
            className="h-10 w-10 m-2"
            alt="Avatar"
            src={data.avatar}
          />
          <Flex justifyContent="start" alignItems="start" flexDirection="col">
            <Label className="cursor-pointer text-left leading-2 text-base">
              Hi, Kutman
            </Label>
            <Label>kutman.stel@gmail.com</Label>
          </Flex>
        </Flex>
        <Separator />
        <Flex flexDirection="col">
          <ProfileDialog />
          <Button
            onClick={logout}
            variant="ghost"
            className="justify-start w-full"
          >
            Log out
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
}
