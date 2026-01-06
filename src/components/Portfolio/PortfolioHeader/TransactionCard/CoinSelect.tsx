import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { COIN_URL } from "@/lib/api";
import { ApiResponse } from "@/lib/AuthContextProvider";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import AvatarWithSkeleton from "@/components/ui/AvatarWithSkeleton";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useLayoutEffect, useState } from "react";
import { cryptoLogos } from "./coinIconUrl";
import { CoinSelectDialog } from "./CoinSelectDialog";
import { CoinSelectPopover } from "./CoinSelectPopover";
import useBreakpoint from "@/lib/useBreakpoint";

export type Coin = {
  id: number;
  name: string;
  ticker: string;
  currentPrice: number;
};

export function CoinSelect({
  onSelectedChange,
  defaultSelectedCoinTicker = "BTC",
}: {
  onSelectedChange: (coin: Coin) => void;
  defaultSelectedCoinTicker?: string;
}) {
  const [open, setOpen] = useState(false);
  const { isMobile } = useBreakpoint();

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
    refetchOnMount: false,
  });

  const coins = response?.data;

  const [selectedCoin, setSelectedCoin] = useState("");

  useLayoutEffect(() => {
    if (coins?.length && !selectedCoin) {
      const defaultCoin =
        coins.find((coin) => coin.ticker === defaultSelectedCoinTicker) ||
        coins[0];
      onSelectedChange(defaultCoin);
      setSelectedCoin(defaultCoin.name.toLowerCase());
    }
  }, [coins, onSelectedChange, selectedCoin]);

  const Trigger = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-full justify-between"
    >
      {selectedCoin ? (
        (() => {
          const selectedItem = coins?.find(
            (coin) => coin.name.toLowerCase() === selectedCoin
          );
          if (selectedItem) {
            return (
              <div className="flex items-center">
                <AvatarWithSkeleton
                  alt={selectedItem.name + "'s icon"}
                  src={cryptoLogos[selectedItem.ticker]}
                  className="mr-2 h-6 w-6"
                />
                {selectedItem.name}
                <Label className="ml-2 text-slate-400">
                  {selectedItem.ticker}
                </Label>
              </div>
            );
          } else {
            return "Select Coin...";
          }
        })()
      ) : isPending ? (
        <div className="flex py-1.5 items-center gap-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-32 h-4 rounded-medium" />
        </div>
      ) : (
        "Select Coin..."
      )}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );

  const Content = (className?: string) => (
    <Command>
      <CommandInput placeholder="Search coin..." />
      <CommandEmpty>No coin found.</CommandEmpty>
      <ScrollArea className={className}>
        <CommandGroup>
          {isPending
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex px-2 py-1.5 items-center gap-2"
                >
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-32 h-4 rounded-medium" />
                </div>
              ))
            : coins?.map((coin) => (
                <CommandItem
                  key={coin.id}
                  value={coin.name}
                  onSelect={(currentValue) => {
                    const coin = coins.find(
                      (coin) => coin.name.toLowerCase() === currentValue
                    );
                    if (coin) {
                      onSelectedChange(coin);
                    }
                    setSelectedCoin(
                      currentValue === selectedCoin ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                  className={cn(
                    "font-medium ",
                    selectedCoin === coin.name.toLowerCase()
                      ? "bg-accent text-accent-foreground"
                      : "opacity-100"
                  )}
                >
                  <AvatarWithSkeleton
                    alt={coin.name + "'s icon"}
                    src={cryptoLogos[coin.ticker]}
                    className="mr-2 h-8 w-8"
                  ></AvatarWithSkeleton>
                  {coin.name}
                  <Label className="ml-2 text-slate-400">{coin.ticker}</Label>
                </CommandItem>
              ))}
        </CommandGroup>
      </ScrollArea>
    </Command>
  );

  return isMobile ? (
    <CoinSelectDialog
      open={open}
      onOpenChange={setOpen}
      Trigger={Trigger}
      Content={Content("h-screen")}
    />
  ) : (
    <CoinSelectPopover
      open={open}
      onOpenChange={setOpen}
      Trigger={Trigger}
      Content={Content("h-[300px]")}
    />
  );
}
