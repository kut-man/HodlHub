import { PropsWithChildren, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const {isLoggedIn, isPending } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isPending) {
      if (!isLoggedIn) {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, isLoggedIn, isPending]);

  return children;
}
