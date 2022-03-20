import React from "react";
import { SideList } from "../../components/SideList/SideList";
import { ViewerQuery } from "../../generated/graphql";

export interface AdminViewProps {
  viewer: ViewerQuery;
}

export const AdminView: React.FC<AdminViewProps> = ({ viewer }) => {
  return (
    <>
      <SideList />

      <div></div>
    </>
  );
};
