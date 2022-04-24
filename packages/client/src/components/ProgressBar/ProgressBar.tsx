import React from "react";
import "./ProgressBar.scss";


export const ProgressBar = () => {
  //   const { bgcolor, completed } = props;

  return ( 
    <div className={"ümbris-progressbar"}>
      <div className={"progressbar"}>
       <div className={"progressbar-style"}>{`${27}%`}</div>
      </div>

      <div className={"progressbar-word"}>
       <div className={"progressbar-style-word"}>Making a payment</div>
       <div className={"progressbar-style-word"}>The order is being made</div>
       <div className={"progressbar-style-word"}>Your order has been shipped</div>
       <div className={"progressbar-style-word"}>Your order has arrived</div>
      </div>
    </div>


      
  );
};
