import React from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { ViewerQuery } from "../../generated/graphql";
import "./landingPageView.scss";

export interface LandingPageViewProps {
  viewer: ViewerQuery;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ viewer }) => {
  return <></>;
};
