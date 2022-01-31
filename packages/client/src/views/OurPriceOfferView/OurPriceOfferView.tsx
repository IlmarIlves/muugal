import React from "react";
import { Header } from "../../components/Header/Header";
import { FileContainer } from "../../components/ItemContainer.tsx/ItemContainer";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import "./ourPriceOffer.scss";

export const OurPriceOfferView: React.FC = () => {
  return (
    <>
      <Header name={"Ilmar"} />

      <div className={"price-offer"}>
        <div className="image">
          <FileContainer name={"Order 1"} />
        </div>

        <div className={"information"}>
          <span>Kogus</span>
          <span>1 tk</span>
          <span>Valmistamise aeg</span>
          <span>1 päev</span>
        </div>

        <div>
          <span>Hinnapakkumine</span>
        </div>
      </div>

      <ProgressBar />
    </>
  );
};
