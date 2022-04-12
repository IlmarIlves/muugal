import React from "react";
import { Route, RouteProps, Routes } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";
import { AdminView } from "./views/AdminView/AdminView";
import { LoginView as AdminLoginView } from "./views/LoginView/AdminLoginView";
import { useViewerQuery } from "./generated/graphql";
import { NotFoundView } from "./views/NotFoundView/NotFoundView";
import { gql } from "@apollo/client";

gql`
  query Viewer {
    viewer {
      id
      firstName
    }
  }
`;

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export const AdminApp: React.FC = () => {
  const { data, loading, error } = useViewerQuery();

  console.log("app viewer query", data?.viewer.id);

  // if (error) {
  //   return <div>error</div>;
  // }

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/"} />} />
          <Route path="login" element={<AdminLoginView />} />
          <Route path="main" element={<AdminView viewer={data!} />} />
          <Route path="main/:menu/*" /* element={authenticatedAdminView} */ />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
