import React from "react";
import { useNavigate } from "react-router-dom";
import { useViewerQuery, ViewerQuery } from "../../generated/graphql";
import "./header.scss";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export interface HeaderProps {
  viewer?: ViewerQuery | undefined;
  isImageShown?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isImageShown = true }) => {
  const { data, loading, error } = useViewerQuery();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const viewer = data;

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
                    {i18next.t("LOG IN")}
                  </li>
                ) : (
                  <span className={"login-text"} onClick={() => navigate("/client")}>
                    {viewer?.viewer?.firstName}
                  </span>
                )}

                {viewer?.viewer !== null ? (
                  <li className={"order-text"} onClick={() => navigate("/order")}>
                    {i18next.t("ORDER")}
                  </li>
                ) : null}

                {viewer?.viewer !== null ? (
                  <li className={"price-text"} onClick={() => navigate("/our-price-offer")}>
                    {i18next.t("OUR PRICE OFFER")}
                  </li>
                ) : null}
              </ul>
            </div>

            {/*<!--choice of languages-->*/}
            <div className="lang-custom-select">
              <select className="lang-select">
                <option className="lang" value="">
                  {i18next.t("Estonian")}
                </option>
                <option className="lang" value="">
                  {i18next.t("English")}
                </option>
              </select>
              <span className="lang-custom-arrow"></span>
            </div>
          </div>
        </div>

        {isImageShown ? (
          <div className="pineapple">
            <span className="Find-Print-Repeat">FIND PRINT REPEAT</span>
          </div>
        ) : null}
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
