import React from "react";
import "./portfolioView.scss";

export const PortFolieView: React.FC = () => (
  <>
    <div className="userpage-menu">
      <ul className="userpage-menu-list">
        <li className="userpage-menu-text">Profile</li>
        <li>|</li>
        <li className="userpage-menu-text">Active Orders</li>
        <li>|</li>
        <li className="userpage-menu-text">Portfolio</li>
        <li>|</li>
        <li className="userpage-menu-text">Instructions</li>
      </ul>
    </div>

    <div className="portfolio-background">
      <div className="userinfo">
        <h2 className="userinfo-header">Portfoolio</h2>
        <div className="NewOrder">
          <ul className="portfolio-list">
            <li>
              <div className="NewOrder-3DFail"></div>
            </li>
            <li>
              <div className="NewOrder-3DFail"></div>
            </li>
            <li>
              <div className="NewOrder-3DFail"></div>
            </li>
            <li>
              <div className="NewOrder-3DFail"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);
