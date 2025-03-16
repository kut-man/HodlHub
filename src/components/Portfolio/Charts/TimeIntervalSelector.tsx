import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsProps } from "@radix-ui/react-tabs";

export default function TimeIntervalSelector(props: TabsProps) {
  return (
    <Tabs {...props} defaultValue="buy">
      <TabsList className="grid w-full grid-cols-4 h-fit p-[2px]">
        <TabsTrigger className="h-[28px]" value="5m">
          5m
        </TabsTrigger>
        <TabsTrigger className="h-[28px]" value="1h">
          1h
        </TabsTrigger>
        <TabsTrigger className="h-[28px]" value="6h">
          6h
        </TabsTrigger>
        <TabsTrigger className="h-[28px]" value="1d">
          1d
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
