import { FaMoon } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { useTheme } from "./Theme";
import { Toggle } from "@radix-ui/react-toggle";
import Logo from "./Logo";
import AccountActions from "./AccountActions";
import Authentication from "./Authentication/Authentication";
import { useQuery } from "@tanstack/react-query";
import { USER_URL } from "@/api";

export default function Header() {
  const { theme, setTheme } = useTheme();

  const {
    data: user,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch(USER_URL, {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <header className="h-16 border-b flex items-center p-2 lg:px-24 px-8">
      <div className="lg:flex-1"></div>
      <Logo alt="CoinMarketCap" />

      <div className="flex-1 flex justify-end items-center">
        {isPending ? null : (
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

            {user && user.email ? (
              <AccountActions refetchUser={refetch} />
            ) : (
              <Authentication refetchUser={refetch} />
            )}
          </>
        )}
      </div>
    </header>
  );
}
