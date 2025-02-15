import { PropsWithChildren, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "./useAuthContext";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (isLoggedIn === false) {
      navigate("/", { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return children;
}
