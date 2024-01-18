import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMoon } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { useTheme } from "./ThemeProvider";
import { Toggle } from "@radix-ui/react-toggle";
import Logo from "./Logo";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b flex items-center p-2 lg:px-24 px-8">
      <div className="lg:flex-1"></div>
      <Logo alt="CoinMarketCap" className="dark:fill-white" />

      <div className="flex-1 flex justify-end items-center">
        <Toggle
          aria-label="Change Theme"
          asChild
          className="m-2"
          onPressedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "dark" ? <HiSun size={25} /> : <FaMoon size={20} />}
        </Toggle>

        <HoverCard closeDelay={100} openDelay={0}>
          <HoverCardTrigger asChild>
            <Avatar className="h-8 w-8 m-2">
              <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </header>
  );
}
