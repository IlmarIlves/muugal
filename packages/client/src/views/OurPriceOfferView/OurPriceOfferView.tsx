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
      <div className="ümbris-priceoffer">
      <div className="our-priceoffer">
       
       <div className="priceoffer-three-columns">
        <div className="image">
          <FileContainer name={"Order 1"} />
        </div>
       </div>

       <div className="priceoffer-three-columns">
        <div className={"information"}>
         <ul class="orderinfo-list">
          <li>
           <div>
            <ul class="spc-orderinfo-list">
             <li>
              <p>Kogus:</p> 
             </li>
             <li>
              <p class="bold-order-info">2</p>
             </li>               
            </ul>
           </div>
                      
           <div>
            <ul class="spc-orderinfo-list">
             <li>
              <p>Valmimisaeg:</p> 
             </li>
             <li>
              <p class="bold-order-info">2 päeva</p>
             </li>                
            </ul>
           </div>
                      
           <div>
            <ul class="spc-orderinfo-list">
             <li>
              <p>Hinnapakkumine:</p> 
             </li>
             <li>
              <p class="bold-order-info">20eurot</p>
             </li>     
            </ul>
           </div>
          </li>
         </ul>
        </div>
        <button className="bold-order-info">ORDER</button>
       </div>
       
      </div>
      </div>

      <ProgressBar />
    </>
  );
};
