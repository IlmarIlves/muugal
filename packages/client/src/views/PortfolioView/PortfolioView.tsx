import React from "react";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import "./portfolioView.scss";

export const PortFolioView: React.FC = () => (
  <>
 <ProfileHeader />

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
