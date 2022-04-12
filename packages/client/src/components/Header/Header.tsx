import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Viewer, ViewerQueryResult } from "../../generated/graphql";
import "./header.scss";

export interface HeaderProps {
  viewer?: User;
}

export const Header: React.FC<HeaderProps> = ({ viewer }) => {
  const navigate = useNavigate();

  return (
    <div className="menu-bar">
      {/* <!--Roheline riba--> */}
      <>
        <div className={"header"}>
          <div className={"logo-container"}>
            {/* <img className={"logo"}  src="img/ouroboros.jpg" /> */}
            <h1 className={"company-name"} onClick={() => navigate("/")}>
              Muugal
            </h1>
          </div>
          <div className={"login-container"}>
            {viewer === null ? (
              <span className={"login-text"} onClick={() => navigate("/login")}>
                LOG IN
              </span>
            ) : (
              <span className={"login-text"} onClick={() => navigate("/login")}>
                {viewer!.firstName}
              </span>
            )}
            <span className={"order-text"} onClick={() => navigate("/order")}>
              ORDER
            </span>
            {viewer !== null ? (
              <span className={"price-text"} onClick={() => navigate("/our-price-offer")}>
                OUR PRICE OFFER
              </span>
            ) : null}
          </div>
        </div>
        {/* <!--Log Out mobla versioon--> */}
      </>

      {/* <!--Profiil--> */}
      {/* <>
        <img className="ouroboros" src="img/ouroboros.jpg" />
        <div className="profile-name">Kasutaja Nimi</div>
      </> */}

      {/* <!--Profiili-nav--> */}
      {/* <div className="profiil-nav">
        <div className="profiil-nav-nupud-orders">
          <span>Orders</span>
        </div>
        <div className="profiil-nav-nupud">
          <span>User Information</span>
        </div>
        <div className="profiil-nav-nupud">
          <span>Printer Information</span>
        </div>
        <div className="profiil-nav-nupud">
          <span>Instructions Manual</span>
        </div>
      </div> */}
    </div>
  );
};
