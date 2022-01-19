import React from "react";
import "./header.scss";

export interface HeaderProps {
  name: string;
}

export const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <>
      {/* <!--Roheline riba--> */}
      <div className="menu-bar">
        {/* <!--Log Out--> */}
        <>
          <div className="dropdown">
            <button className="dropbtn">{name}</button>
            <div className="dropdown-content">
              <div className="logOut">
                <form>
                  <button type="submit">Log Out</button>
                </form>
              </div>
            </div>
          </div>
          {/* <!--Log Out mobla versioon--> */}
          <>
            <form>
              <button type="submit">Log Out</button>
            </form>
          </>
        </>

        <div>{/* <img className="one" src="img/3dprintimse logo.jpg" width="150" height="70" title="Muugal" /> */}</div>
      </div>

      {/* <!--Profiil--> */}
      <>
        {/* <img className="ouroboros" src="img/ouroboros.jpg" /> */}
        <div className="profiil-nimi">Kasutaja Nimi</div>
      </>

      {/* <!--Profiili-nav--> */}
      <div className="profiil-nav">
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
      </div>
    </>
  );
};
