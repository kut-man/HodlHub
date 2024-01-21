import { Flex } from "@tremor/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TiArrowSortedUp } from "react-icons/ti";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export default function PortfolioHeader() {
  return (
    <Flex className="flex-col sm:flex-row sm:items-center items-start">
      <div>
        <Flex flexDirection="row" alignItems="center" justifyContent="start">
          <Avatar className="h-8 w-8 m-2 ml-0">
            <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Label className="text-lg">Binance</Label>
        </Flex>
        <Flex flexDirection="row" justifyContent="start">
          <Label className="font-bold text-3xl">$1,047.69</Label>
          <Button
            aria-label="Toggle number's visibility"
            size="icon"
            variant="ghost"
          >
            <MdOutlineRemoveRedEye className="mx-2 mt-1" size={27} />
          </Button>
        </Flex>
        <Flex
          className="my-1 text-green-500 items-end"
          flexDirection="row"
          justifyContent="start"
        >
          <Label className="text-base">+ $4.7324</Label>
          <TiArrowSortedUp className="ml-2 mr-1 mb-0.5" />
          <Label className="text-base">$0.45%</Label>
        </Flex>
      </div>
      <div className="flex items-center space-x-4">
        <div className="items-center space-x-2 sm:inline-flex hidden">
          <Label htmlFor="show-charts">Show Charts</Label>
          <Switch id="show-charts" />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" aria-label="Add Transaction">+ Add Transaction</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button variant="secondary" size="sm" aria-label="Portfolio Settings">
          <BsThreeDots />
        </Button>
      </div>
    </Flex>
  );
}
