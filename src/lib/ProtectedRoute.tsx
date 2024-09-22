import { PropsWithChildren, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (isLoggedIn === false) {
      navigate("/", { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return children;
}
