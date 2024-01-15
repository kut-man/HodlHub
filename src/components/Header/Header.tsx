import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import { Toggle } from "@radix-ui/react-toggle";
import Logo from "./Logo";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b flex items-center p-2 lg:px-24 px-8">
      <div className="lg:flex-1"></div>
      <Logo alt="CoinMarketCap" className="dark:fill-white" />

      <div className="flex-1 flex justify-end items-center">
        <Toggle
          asChild
          className="h-6 w-6 m-2"
          onPressedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </Toggle>
        <Avatar className="h-8 w-8 m-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
