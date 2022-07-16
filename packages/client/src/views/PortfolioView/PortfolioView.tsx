import { gql } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Model } from "../../components/Model/Model";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { useOrderMutation, useOrdersQuery, useViewerQuery } from "../../generated/graphql";
import "./portfolioView.scss";

gql`
  query Orders($userId: ID!) {
    orders(userId: $userId) {
      id
      userId
      email
      telephone
      colors
      amount
      priceInCents
      finishedInDays
      additionalInfo
      lastOffererUserId
      fileUrl
    }
  }
`;

export const PortFolioView: React.FC = () => {
  const navigate = useNavigate();
  const { data: viewerData, loading: viewerLoading, error: viewerError } = useViewerQuery();

  if (viewerData?.viewer === null) {
    navigate("/");
  }

  const { data, loading, error } = useOrdersQuery({ variables: { userId: viewerData?.viewer?.id! } });

  return (
    <>
      <Header isImageShown={false} />

      <ProfileHeader />

      <div className="portfolio-background">
        <div className="userinfo">
          <h2 className="userinfo-header">Portfoolio</h2>
          <div className="NewOrder">
            <ul className="portfolio-list">
              {data?.orders.map((order) => (
                <Model url={order.fileUrl} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
