import React from "react";
import { Header } from "../../components/Header/Header";
import { FileContainer } from "../../components/ItemContainer.tsx/ItemContainer";
import { Model } from "../../components/Model/Model";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { useViewerQuery, ViewerQuery } from "../../generated/graphql";
import "./ourPriceOffer.scss";

export const OurPriceOfferView: React.FC = ({}) => {
  const { data, loading, error } = useViewerQuery();

  return (
    <>
      <Header />

      <div className={"price-offer"}>
        <div className="image">
          <FileContainer name={"Order 1"} />
        </div>
        <div className={"model"}>
          <Model />
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
