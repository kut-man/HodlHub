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
import { FiPlus } from "react-icons/fi";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Portfolio() {
  return (
    <Card className="border-none shadow-none  min-w-[340px]">
      <CardHeader>
        <CardTitle className="text-lg">My portfolio</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <Button aria-label="Select Portfolio" variant="secondary" className="w-full h-14 p-0 mb-1">
          <Flex justifyContent="start">
            <Avatar className="h-10 w-10 m-2">
              <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
            </Avatar>
            <Flex justifyContent="start" alignItems="start" flexDirection="col">
              <Label className="text-left leading-2 text-base">Binance</Label>
              <Label className="text-left leading-2 font-normal text-gray-500">
                $1,052.78
              </Label>
            </Flex>
          </Flex>
        </Button>
      </CardContent>
      <CardFooter className="text-blue-600">
        <button className="flex items-center">
          <FiPlus size={20} />
          <Label className="text-base ml-1">Create Portfolio</Label>
        </button>
      </CardFooter>
    </Card>
  );
}
