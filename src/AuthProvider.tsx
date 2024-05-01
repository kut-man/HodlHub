import { ReactNode, createContext, useContext } from "react";
import { USER_URL } from "./api";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext<ContexValue>({});

export type Holder = {
  name: string;
  email: string;
  avatar: string;
};

type ContexValue = {
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

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
