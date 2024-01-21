import { Flex } from "@tremor/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TiArrowSortedUp } from "react-icons/ti";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import AddTransaction from "./AddTransaction";

interface PortfolioHeaderProps {
  setShowCharts: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PortfolioHeader({
  setShowCharts,
}: PortfolioHeaderProps) {
  return (
    <Flex className="flex-col sm:flex-row sm:items-center items-start">
      <div>
        <Flex flexDirection="row" alignItems="center" justifyContent="start">
          <Avatar className="h-8 w-8 m-2 ml-0">
            <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
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
          <Switch
            defaultChecked={true}
            onCheckedChange={() => setShowCharts((prev: boolean) => !prev)}
            id="show-charts"
          />
        </div>

        <AddTransaction />

        <Button variant="secondary" size="sm" aria-label="Portfolio Settings">
          <BsThreeDots />
        </Button>
      </div>
    </Flex>
  );
}
