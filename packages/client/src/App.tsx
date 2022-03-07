import React from "react";
import { Route, RouteProps, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { LandingPageView } from "./views/LandingPageView/LandingPageView";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { LoginView } from "./views/LoginView/LoginView";
import { NotFoundView } from "./views/NotFoundView/NotFoundView";
import { OurPriceOfferView } from "./views/OurPriceOfferView/OurPriceOfferView";
import { OrderView } from "./views/OrderView/OrderView";
import { gql } from "@apollo/client";
import { useViewerQuery } from "./generated/graphql";

gql`
  query Viewer {
    viewer {
      id
      firstName
      lastName
    }
  }
`;

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export const App: React.FC = () => {
  const { data, loading, error } = useViewerQuery();

  if (error) {
    return <div>error</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageView viewer={data} />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/our-price-offer" element={<OurPriceOfferView viewer={data} />} />
          <Route path="/order" element={<OrderView viewer={data} />} />
          <Route path="*" element={<NotFoundView />} />
          {/* <Route path="dashboard" element={<PrivateRoute roles={[ROLE.ADMIN]} component={Dashboard} />} />
          <Route path="users" element={<PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={Users} />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
