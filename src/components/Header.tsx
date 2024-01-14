import coinMarketCap from "../assets/coinMarketCap.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  return (
    <header className="border-b flex p-2 lg:px-24 px-8">
      <div className="lg:flex-1"></div>
      <img src={coinMarketCap} alt="CoinMarketCap logo" />

      <div className="flex-1 flex justify-end items-center">
        <FaMoon className="h-6 w-6 m-2" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
