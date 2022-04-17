import React from "react";
import { Link } from "react-router-dom";

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
  <div>
    {items.map((item, index) => {
      // if (!hasAnyScopes(item.authorizedScopes, viewerScopes)) {
      //   return null;
      // }

      console.log(item);

      return <MainMenuItem key={index} item={item} active={index === activeItemIndex} />;
    })}
  </div>
);

export interface MainMenuItemProps {
  item: MainMenuItemInfo;
  active: boolean;
}

export const MainMenuItem: React.FC<MainMenuItemProps> = ({ item, active }) => <Link to={item.url}>{item.title}</Link>;
