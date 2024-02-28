import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Flex } from "@tremor/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreatePortfolio } from "./CreatePortfolio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import BalanceLabel from "../PerformanceTiles/Labels/BalanceLabel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { ChangeAvatar } from "./ChangeAvatar";

export default function Portfolio() {
  const [isAvatarDialogPage, setIsAvatarDialogPage] = useState(false);
  const changeCurrentDialogPage = () => {
    setIsAvatarDialogPage((prev) => !prev);
  };
  return (
    <Card className="border-none shadow-none max-lg:w-full lg:min-w-[340px]">
      <CardHeader>
        <CardTitle className="text-lg">My portfolio</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <Button
          aria-label="Select Portfolio"
          variant="secondary"
          className="w-full h-14 p-0 mb-1"
        >
          <Flex justifyContent="start">
            <Avatar className="h-10 w-10 m-2">
              <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
            </Avatar>
            <Flex justifyContent="start" alignItems="start" flexDirection="col">
              <Label className="cursor-pointer text-left leading-2 text-base">
                Binance
              </Label>
              <BalanceLabel
                className="cursor-pointer text-left leading-2 font-normal text-gray-500"
                balance={1052.78}
              />
            </Flex>
          </Flex>
        </Button>
      </CardContent>
      <CardFooter className="text-blue-600">
        <Dialog onOpenChange={() => setIsAvatarDialogPage(false)}>
          <DialogTrigger asChild>
            <button className="flex items-center">
              <FiPlus size={20} />
              <Label className="cursor-pointer text-base ml-1">
                Create Portfolio
              </Label>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Portfolio</DialogTitle>
            </DialogHeader>
            {isAvatarDialogPage ? (
              <ChangeAvatar changeCurrentDialogPage={changeCurrentDialogPage} />
            ) : (
              <CreatePortfolio
                changeCurrentDialogPage={changeCurrentDialogPage}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
