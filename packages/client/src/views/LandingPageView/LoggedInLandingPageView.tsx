import React from "react";
import { Header } from "../../components/Header/Header";
import { MuugalSelection } from "../../components/MuugalSelection/MuugalSelection";
import { Viewer, ViewerQuery } from "../../generated/graphql";
import "./landingPageView.scss";

export interface LoggedInLandingPageViewProps {
  viewer: ViewerQuery | undefined;
}

export const LoggedInLandingPageView: React.FC<LoggedInLandingPageViewProps> = ({ viewer }) => {
  return (
    <>
      <Header />

      <MuugalSelection />
    </>
  );
};
