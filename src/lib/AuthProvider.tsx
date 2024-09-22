import { ReactNode, createContext, useEffect, useState } from "react";
import { USER_URL } from "./api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export const AuthContext = createContext<ContextValue>({} as ContextValue);

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
  refetchUser: () => void;
  isPending: boolean;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: data,
    refetch,
    isPending,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ApiResponse>({
    queryKey: ["user"],
    queryFn: () =>
      fetch(USER_URL, {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json()),
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>();

  useEffect(() => {
    if (isSuccess && data && data.status === 200) {
      setIsLoggedIn(true);
    } else if ((isSuccess && data) || isError) {
      setIsLoggedIn(false);
    }
  }, [data, isError, isSuccess]);

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center w-full">
        <h1>SOME TERRIBLE ERROR HAPPENED, SORRY :\</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center w-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, refetchUser: refetch, isPending }}
    >
      {children}
    </AuthContext.Provider>
  );
}
