import React from "react";
import { Route, RouteProps, Routes } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";
import { AdminView } from "./views/AdminView/AdminView";
import { LoginView } from "./views/LoginView/AdminLoginView";
import { useViewerQuery } from "./generated/graphql";
import { NotFoundView } from "./views/NotFoundView/NotFoundView";
import { gql } from "@apollo/client";
import { buildUrl } from "./services/buildUrl";
import { AdminViewParams, ADMIN_VIEW_PATH, LOGIN_VIEW_PATH, ViewerInfo } from "./routes";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";

gql`
  query Viewer {
    viewer {
      id
      firstName
    }
  }
`;

export const AdminApp: React.FC = () => {
  const { data, loading, error } = useViewerQuery();

  // if (error) {
  //   return <div>error</div>;
  // }

  // if (loading) {
  //   return <div>loading</div>;
  // }

  // get viewer info and check whether the user is logged in
  const viewer = data?.viewer;
  const isLoggedIn = viewer !== null;

  // decide path to redirect to from root path based on whether the user is logged in
  const indexPath = isLoggedIn ? buildUrl<AdminViewParams>(ADMIN_VIEW_PATH) : buildUrl(LOGIN_VIEW_PATH);

  // login path used when user tries to access protected route requiring being logged in
  const loginPath = buildUrl(LOGIN_VIEW_PATH);

  // admin view requires authentication
  const authenticatedAdminView = (
    <RequireAuth allowed={isLoggedIn} redirectNotAllowed={loginPath}>
      <AdminView viewer={viewer as ViewerInfo} />
    </RequireAuth>
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={indexPath} />} />
          <Route path="login" element={<LoginView />} />
          <Route path="main" element={authenticatedAdminView} />
          <Route path="main/:menu/*" element={authenticatedAdminView} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
