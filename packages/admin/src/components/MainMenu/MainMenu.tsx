import React from "react";
import { Link } from "react-router-dom";
import "./mainMenu.scss";

export interface MainMenuItemInfo {
  title: string;
  url: string;
  // authorizedScopes: UserScopeEnum[];
}

export type OnMenuItemClickCallback = (index: number) => void;

export interface MainMenuProps {
  items: MainMenuItemInfo[];
  activeItemIndex: number;
  // viewerScopes: UserScopeEnum[];
}

export const MainMenu: React.FC<MainMenuProps> = ({
  items,
  activeItemIndex,
  /* viewerScopes, className, */ ...rest
}) => (
  <div className="items">
    {items.map((item, index) => {
      return <MainMenuItem key={index} item={item} active={index === activeItemIndex} />;
    })}
  </div>
);

export interface MainMenuItemProps {
  item: MainMenuItemInfo;
  active: boolean;
}

export const MainMenuItem: React.FC<MainMenuItemProps> = ({ item, active }) => (
  <div className="menu-bar">
    <div className="GreenLine">
      <div className="header">
        <div className="logo-container">
          <span className="company-name">
            <div className="logo"></div>
          </span>
          <div className="admin">ADMIN</div>
        </div>

        <Link to={item.url}>{item.title}</Link>
      </div>
    </div>
  </div>
);
