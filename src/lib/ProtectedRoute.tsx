import { PropsWithChildren, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isPending } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isPending) {
      if (!user || !user.email) {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, user, isPending]);

  return children;
}
