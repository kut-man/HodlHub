import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { COIN_URL } from "@/lib/api";
import { ApiResponse } from "@/lib/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import AvatarWithSkeleton from "@/components/ui/AvatarWithSkeleton";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type Coin = {
  id: number;
  name: string;
  logo: string;
  ticker: string;
};

export function CoinSelect({
  selected,
  onSelectedChange,
}: {
  selected: string;
  onSelectedChange: (coin: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const { data: response, isPending } = useQuery<ApiResponse<Coin[]>>({
    queryKey: ["coin"],
    queryFn: async () => {
      const response = await fetch(COIN_URL, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw Error("Portfolio list fetch failed!");
      return await response.json();
    },
  });

  const coins = response?.data;

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected
            ? (() => {
                const selectedCoin = coins?.find(
                  (coin) => coin.name.toLowerCase() === selected
                );
                if (selectedCoin) {
                  return (
                    <div className="flex items-center">
                      <AvatarWithSkeleton
                        alt={selectedCoin.name + "'s icon"}
                        src={selectedCoin.logo}
                        className="mr-2 h-6 w-6"
                      />
                      {selectedCoin.name}
                      <Label className="ml-2 text-slate-400">
                        {selectedCoin.ticker}
                      </Label>
                    </div>
                  );
                } else {
                  return "Select Coin...";
                }
              })()
            : "Select Coin..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Search coin..." />
          <CommandEmpty>No coin found.</CommandEmpty>
          <ScrollArea className="h-[300px]">
            <CommandGroup>
              {isPending
                ? Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="flex px-2 py-1.5 items-center gap-2">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="w-32 h-4 rounded-medium" />
                    </div>
                  ))
                : coins?.map((coin) => (
                    <CommandItem
                      key={coin.id}
                      value={coin.name}
                      onSelect={(currentValue) => {
                        onSelectedChange(
                          currentValue === selected ? "" : currentValue
                        );
                        setOpen(false);
                      }}
                      className={cn(
                        "font-medium ",
                        selected === coin.name.toLowerCase()
                          ? "bg-accent text-accent-foreground"
                          : "opacity-100"
                      )}
                    >
                      <AvatarWithSkeleton
                        alt={coin.name + "'s icon"}
                        src={coin.logo}
                        className="mr-2 h-8 w-8"
                      ></AvatarWithSkeleton>
                      {coin.name}
                      <Label className="ml-2 text-slate-400">
                        {coin.ticker}
                      </Label>
                    </CommandItem>
                  ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
