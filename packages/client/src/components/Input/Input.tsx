import React from "react";

import "./landingPageView.scss";

export const Input: React.FC = () => {
  return (
    <>
      <input id="username" name="username" type="text" className={"error"} aria-invalid="true" />
    </>
  );
};
