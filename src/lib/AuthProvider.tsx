import { ReactNode, createContext } from "react";
import { USER_URL } from "./api";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext<ContextValue>({});

export type Holder = {
  name: string;
  email: string;
  avatar: string;
};

type ContextValue = {
  user?: Holder;
  refetchUser?: () => void;
  isPending?: boolean;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
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
    <AuthContext.Provider value={{ user, refetchUser: refetch, isPending }}>
      {children}
    </AuthContext.Provider>
  );
}
