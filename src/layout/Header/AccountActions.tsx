import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Flex from "@/components/ui/flex.tsx";
import { Separator } from "@/components/ui/separator";
import AvatarWithSkeleton from "@/components/ui/AvatarWithSkeleton";
import { LOGOUT_URL } from "@/lib/api";
import { useAuthContext } from "@/lib/useAuthContext";
import { useQueryClient } from "@tanstack/react-query";
import ProfileDialog from "./ProfileDialog/ProfileDialog";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountActions() {
  const { refetchUser, data } = useAuthContext();
  const queryClient = useQueryClient();
  const [openPopover, setOpenPopover] = useState(false);

  const logout = async () => {
    try {
      const response = await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        queryClient.clear();
        refetchUser();
        toast.success("Logged out successfully!");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Popover onOpenChange={(open) => setOpenPopover(open)} open={openPopover}>
      <PopoverTrigger>
        <AvatarWithSkeleton
          className="m-2 h-8 w-8"
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
            className="m-2 h-10 w-10"
            alt="Avatar"
            src={data.avatar}
          />
          <Flex justifyContent="start" alignItems="start" flexDirection="col">
            <span className="cursor-pointer text-left text-base">
              Hi, {data.name}
            </span>
            <span>{data.email}</span>
          </Flex>
        </Flex>
        <Separator orientation="horizontal" />
        <Flex flexDirection="col">
          <ProfileDialog onClose={() => setOpenPopover(false)} />
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start"
          >
            Log out
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
}
