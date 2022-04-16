import React from "react";
import { Navigate } from "react-router";
import { useStoreCurrentPath } from "../../services/useStoreCurrentPath";

export interface RequireAuthProps {
  allowed: boolean;
  redirectNotAllowed: string;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ allowed, redirectNotAllowed, children }) => {
  // store current route path if navigation is not allowed
  useStoreCurrentPath(!allowed);

  // navigate to given path if route is not allowed
  if (!allowed) {
    return <Navigate to={redirectNotAllowed} />;
  }

  // return children
  return <>{children}</>;
};
