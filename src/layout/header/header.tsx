import { useTheme } from "./theme";
import Logo from "./logo";
import AccountActions from "./account-actions";
import Authentication from "./authentication/authentication";
import { useAuthContext } from "@/lib/use-auth-context";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <header className="flex h-16 items-center p-2 px-8 lg:px-24">
        <div className="lg:flex-1"></div>
        <Logo alt="CoinMarketCap" />

        <div className="flex flex-1 items-center justify-end">
          <>
            <Toggle
              aria-label="Change Theme"
              className="m-2"
              onPressedChange={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Toggle>

            {isLoggedIn ? (
              <AccountActions />
            ) : isLoggedIn === false ? (
              <Authentication />
            ) : null}
          </>
        </div>
      </header>
      <Separator orientation="horizontal" />
    </>
  );
}
