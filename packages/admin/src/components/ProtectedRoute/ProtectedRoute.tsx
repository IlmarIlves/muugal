import React from "react";
import { Navigate, Route, RouteProps } from "react-router";
// import { useStoreCurrentPath } from "../../hooks/useStoreCurrentPath";

export interface ProtectedRouteProps extends RouteProps {
  allowed: boolean;
  redirectNotAllowed: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowed, redirectNotAllowed, ...rest }) => {
  // store current route path if navigation is not allowed
  //   useStoreCurrentPath(!allowed);

  // redirect to given path if route is not allowed
  if (!allowed) {
    return <Navigate to={redirectNotAllowed} />;
  }

  // return normal route
  return <Route {...rest} />;
};
