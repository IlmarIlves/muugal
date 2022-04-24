import React from "react";
import { Header } from "../../components/Header/Header";
import { FileContainer } from "../../components/ItemContainer.tsx/ItemContainer";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { ViewerQuery } from "../../generated/graphql";
import "./ourPriceOffer.scss";

interface OurPriceOfferViewProps {
  viewer: ViewerQuery | undefined;
}

export const OurPriceOfferView: React.FC<OurPriceOfferViewProps> = ({ viewer }) => {
  return (
    <>
      <Header />
      <div className={"ümbris-priceoffer"}>
      <div className={"our-priceoffer"}>
       
       <div className="priceoffer-three-columns">
        <div className="image">
          <FileContainer name={"Order 1"} />
        </div>
       </div>

       <div className="priceoffer-three-columns">
        <div className={"information"}>
         <input type="Text" className="input" placeholder="Kogus:"  disabled/>
         <input type="Text" className="input" placeholder="Valmimisaeg:"  disabled/>
         <input type="Text" className="input" placeholder="Hinnapakkumine:"  disabled/>
        </div>
        <button className="second-btn">ORDER</button>
       </div>
       
      </div>
      </div>

      <ProgressBar />
    </>
  );
};
