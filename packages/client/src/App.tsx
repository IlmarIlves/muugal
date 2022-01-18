import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { LandingPageView } from "./views/LandingPageView/LandingPageView";

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
