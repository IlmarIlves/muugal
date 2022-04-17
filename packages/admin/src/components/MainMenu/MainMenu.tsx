import React from "react";
import { Link } from "react-router-dom";

export interface MainMenuItemInfo {
  title: string;
  url: string;
  //   authorizedScopes: UserScopeEnum[];
}

export type OnMenuItemClickCallback = (index: number) => void;

export interface MainMenuProps {
  items: MainMenuItemInfo[];
  activeItemIndex: number;
  //   viewerScopes: UserScopeEnum[];
}
