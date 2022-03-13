import React from "react";
import { useNavigate } from "react-router-dom";
import { ViewerQuery } from "../../generated/graphql";
import "./footer.scss";

export interface HeaderProps {
  viewer?: ViewerQuery | undefined;
}

export const Footer: React.FC<HeaderProps> = ({ viewer }) => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <>
        <div className={"footer"}>
          <h1 className={"terms"} onClick={() => navigate("/")}>
            Terms and conditions
          </h1>
        </div>
      </>
    </div>
  );
};
