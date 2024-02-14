import { Flex } from "@tremor/react";
import Tile from "./Tile";

const mock1 = {
  description: "All-time profit",
  title: 345.23,
  performance: 2.43,
}

const mock2 = {
  description: "Best Performer",
  avatarSrc: "https://github.com/shadcn.png",
  title: "SOL",
  performance: 2.43,
  profitLoss: 5.32
}

const mock3 = {
  description: "Worst Performer",
  avatarSrc: "https://github.com/shadcn.png",
  title: "ADA",
  performance: -2.43,
  profitLoss: -5.32
}

export default function PerformanceTiles() {
  return (
    <Flex className="md:gap-6 flex-col md:flex-row" justifyContent="start">
      <Tile {...mock1} />
      <Tile {...mock2} />
      <Tile {...mock3} />
    </Flex>
  );
}
