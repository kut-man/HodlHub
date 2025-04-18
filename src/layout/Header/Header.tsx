import { FaMoon } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { useTheme } from "./Theme";
import { Toggle } from "@radix-ui/react-toggle";
import Logo from "./Logo";
import AccountActions from "./AccountActions";
import Authentication from "./Authentication/Authentication";
import { useAuthContext } from "@/lib/useAuthContext";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { isLoggedIn } = useAuthContext();

  return (
    <header className="h-16 border-b flex items-center p-2 lg:px-24 px-8">
      <div className="lg:flex-1"></div>
      <Logo alt="CoinMarketCap" />

      <div className="flex-1 flex justify-end items-center">
        <>
          <Toggle
            aria-label="Change Theme"
            className="m-2"
            onPressedChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            {theme === "dark" ? <HiSun size={25} /> : <FaMoon size={20} />}
          </Toggle>

          {isLoggedIn ? (
            <AccountActions />
          ) : isLoggedIn === false ? (
            <Authentication />
          ) : null}
        </>
      </div>
    </header>
  );
}
