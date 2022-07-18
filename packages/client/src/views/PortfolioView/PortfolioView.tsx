import { gql } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Model } from "../../components/Model/Model";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { useOrdersQuery, useViewerQuery } from "../../generated/graphql";
import "./portfolioView.scss";

gql`
  query Orders {
    orders {
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

  const { data, loading, error } = useOrdersQuery();

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (viewerData?.viewer === null) {
    navigate("/");
  }

  console.log(data?.orders);

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
                <>
                  <Model url={order.fileUrl} />
                  <span>{order.amount}</span>
                  <span>{order.colors}</span>
                  {/* <span>{order.fileUrl}</span> */}
                  <span>{order.additionalInfo}</span>
                  <span>{order.additionalInfo}</span>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
