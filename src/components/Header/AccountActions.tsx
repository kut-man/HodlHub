import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Flex } from "@tremor/react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export default function AccountActions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="h-8 w-8 m-2">
          <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent onOpenAutoFocus={e => e.preventDefault()}>
        <Flex justifyContent="start">
          <Avatar className="h-10 w-10 m-2">
            <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
          </Avatar>
          <Flex justifyContent="start" alignItems="start" flexDirection="col">
            <Label className="cursor-pointer text-left leading-2 text-base">
              Hi, Kutman
            </Label>
            <Label>kutman.stel@gmail.com</Label>
          </Flex>
        </Flex>
        <Separator/>
        <Flex flexDirection="col">
          <Button variant="ghost" className="justify-start w-full">Settings</Button>
          <Button variant="ghost" className="justify-start w-full">Log out</Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
}
