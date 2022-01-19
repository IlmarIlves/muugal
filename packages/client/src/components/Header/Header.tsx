import React from "react";
import "./header.scss";

export const Header: React.FC = () => {
  return (
    <>
      <div className={"header"}>
        <div className={"logo-container"}>
          <h1 className={"logo"}>Logo</h1>
          <h1 className={"company-name"}>Muugal</h1>
        </div>
        <div className={"login-container"}>
          <span className={"login-text"}>LOG IN</span>
          <span className={"order-text"}>ORDER</span>
          <span className={"price-text"}>OUR PRICE OFFER</span>
        </div>
      </div>
    </>
  );
};
