import { Flex } from "@tremor/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TiArrowSortedUp } from "react-icons/ti";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";

export default function PortfolioHeader() {
  return (
    <Flex className="px-6 flex-col sm:flex-row items-start">
      <div>
        <Flex flexDirection="row" alignItems="center" justifyContent="start">
          <Avatar className="h-8 w-8 m-2 ml-0">
            <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Label className="text-lg">Binance</Label>
        </Flex>
        <Flex flexDirection="row" justifyContent="start">
          <Label className="text-4xl">$1,047.69</Label>
          <Button
            aria-label="Toggle number's visibility"
            size="icon"
            variant="ghost"
          >
            <MdOutlineRemoveRedEye className="mx-2 mt-1" size={27} />
          </Button>
        </Flex>
        <Flex
          className="my-4 text-green-500 items-end"
          flexDirection="row"
          justifyContent="start"
        >
          <Label className="text-lg">+ $4.7324</Label>
          <TiArrowSortedUp className="ml-2 mr-1 mb-0.5" />
          <Label className="text-lg">$0.45%</Label>
        </Flex>
      </div>
      <div className="flex items-center space-x-2">
        <div className="items-center space-x-2 sm:inline-flex hidden">
          <Label htmlFor="show-charts">Show Charts</Label>
          <Switch id="show-charts" />
        </div>
        <Button aria-label="Add Transaction">+ Add Transaction</Button>
        <Button variant="secondary" size="icon" aria-label="Portfolio Settings">
          <BsThreeDots />
        </Button>
      </div>
    </Flex>
  );
}
