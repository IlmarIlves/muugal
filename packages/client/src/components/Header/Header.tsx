import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";

export interface HeaderProps {
  name: string;
}

export const Header: React.FC<HeaderProps> = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div className="menu-bar">
      {/* <!--Roheline riba--> */}
      <>
        <div className={"header"}>
          <div className={"logo-container"}>
            {/* <img className={"logo"}  src="img/ouroboros.jpg" /> */}
            <h1 className={"company-name"}>Muugal</h1>
          </div>
          <div className={"login-container"}>
            <span className={"login-text"} onClick={() => navigate("/login")}>
              LOG IN
            </span>
            <span className={"order-text"} onClick={() => navigate("/order")}>
              ORDER
            </span>
            <span className={"price-text"} onClick={() => navigate("/our-price-offer")}>
              OUR PRICE OFFER
            </span>
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
