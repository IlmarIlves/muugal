import React from "react";
import "./header.scss";

export const Header: React.FC = () => {
  return (
    <>
      <div className={"header"}>
        <div className={"logo-container"}>
          <span>O</span>
          <h1>Muugal</h1>
        </div>
        <div className={"login-container"}>
          <span>Log in</span>
          <span>Order</span>
        </div>
      </div>
    </>
  );
};
