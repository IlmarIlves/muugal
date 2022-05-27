import React from "react";
import { useNavigate } from "react-router-dom";
import "./profileHeader.scss";

export const ProfileHeader: React.FC = () => {
  const navigate = useNavigate();

    return(
  <>
     <div className="userpage-menu">
      <ul className="userpage-menu-list">
        <li className="userpage-menu-text"  onClick={() => navigate("/client")}>Profile</li>
        <li>|</li>
        <li className="userpage-menu-text" onClick={() => navigate("/active-orders")}>Active Orders</li>
        <li>|</li>
        <li className="userpage-menu-text" onClick={() => navigate("/portfolio")}>Portfolio</li>
        <li>|</li>
        <li className="userpage-menu-text"  onClick={() => navigate("/instructions")}>Instructions</li>
      </ul>
    </div>
  </>)
};
