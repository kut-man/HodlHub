import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Flex } from "@tremor/react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AvatarWithSceleton from "@/components/ui/AvatarWithSceleton";

export default function AccountActions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <AvatarWithSceleton
          className="h-8 w-8 m-2"
          alt="Avatar"
          src="https://github.com/shadcn.png"
        />
      </PopoverTrigger>
      <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <Flex justifyContent="start">
          <AvatarWithSceleton
            className="h-10 w-10 m-2"
            alt="Avatar"
            src="https://github.com/shadcn.png"
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
          <Button variant="ghost" className="justify-start w-full">
            Settings
          </Button>
          <Button variant="ghost" className="justify-start w-full">
            Log out
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
}
