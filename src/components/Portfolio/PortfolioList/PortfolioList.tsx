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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import BalanceLabel from "../PerformanceTiles/Labels/BalanceLabel";
import PortfolioDialog from "./PortfolioDialog";

export default function Portfolio() {
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
        <PortfolioDialog />
      </CardFooter>
    </Card>
  );
}
