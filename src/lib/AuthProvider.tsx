import { ReactNode, createContext } from "react";
import { USER_URL } from "./api";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext<ContextValue>({});

export type Holder = {
  name: string;
  email: string;
  avatar: string;
};

export type ApiResponse<T = unknown> = {
  status: number;
  code: string;
  message: string;
  data?: T;
  timestamp: string;
  path: string;
};


type ContextValue = {
  isLoggedIn?: boolean;
  refetchUser?: () => void;
  isPending?: boolean;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: data,
    refetch,
    isPending,
  } = useQuery<ApiResponse>({
    queryKey: ["user"],
    queryFn: () =>
      fetch(USER_URL, {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json()),
  });

  const isLoggedIn = data?.status == 200;

  return (
    <AuthContext.Provider value={{ isLoggedIn, refetchUser: refetch, isPending }}>
      {children}
    </AuthContext.Provider>
  );
}
