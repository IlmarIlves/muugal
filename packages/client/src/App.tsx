import React from "react";
import { Route, RouteProps, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { LandingPageView } from "./views/LandingPageView/LandingPageView";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { LoginView } from "./views/LoginView/LoginView";
import { NotFoundView } from "./views/NotFoundView/NotFoundView";

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageView />} />
          <Route path="*" element={<NotFoundView />} />
          {/* <Route path="dashboard" element={<PrivateRoute roles={[ROLE.ADMIN]} component={Dashboard} />} />
          <Route path="users" element={<PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={Users} />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
