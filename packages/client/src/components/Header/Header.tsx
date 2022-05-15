import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Viewer, ViewerQuery, ViewerQueryResult } from "../../generated/graphql";
import "./header.scss";

export interface HeaderProps {
  viewer?: ViewerQuery | undefined;
}

export const Header: React.FC<HeaderProps> = ({ viewer }) => {
  const navigate = useNavigate();

  return (
    <div className="menu-bar">
      {/* <!--Roheline riba--> */}
      <>
        <div className="GreenLine">
          <div className={"header"}>
            <div className={"logo-container"}>
              <span className={"company-name"} onClick={() => navigate("/")}>
                <div className="logo"></div>
              </span>
            </div>

            {/* <!--Burgermenu--> */}
            <input className="burgermenu" type="checkbox" id="overlay-input" />
            <label htmlFor="overlay-input" id="overlay-button">
              <span></span>
            </label>

            <div id="overlay">
              <ul className={"login-container"}>
                {viewer?.viewer === null ? (
                  <li className={"login-text"} onClick={() => navigate("/login")}>
                    LOG IN
                  </li>
                ) : (
                  <span className={"login-text"} onClick={() => navigate("/login")}>
                    {viewer?.viewer.firstName}
                  </span>
                )}

                <li className={"order-text"} onClick={() => navigate("/order")}>
                  ORDER
                </li>

                {viewer !== null ? (
                  <li className={"price-text"} onClick={() => navigate("/our-price-offer")}>
                    OUR PRICE OFFER
                  </li>
                ) : null}
              </ul>
            </div>

            {/*<!--choice of languages-->*/}
            <div className="lang-custom-select">
              <select className="lang-select">
                <option className="lang" value="">
                  Eesti
                </option>
                <option className="lang" value="">
                  English
                </option>
              </select>
              <span className="lang-custom-arrow"></span>
            </div>
          </div>
        </div>

        <div className="pineapple">
          <span className="Find-Print-Repeat">FIND PRINT REPEAT</span>
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
