import React from "react";
import { FileContainer } from "../ItemContainer.tsx/ItemContainer";
import "./muugalSelection.scss";


const files = [
  { name: "1", information: "NAME 1" },
  { name: "2", information: "NAME 2" },
  { name: "3", information: "NAME 3" },
  { name: "4", information: "NAME 4" },
];

export const MuugalSelection: React.FC = () => {
  return (
   <span>
    <div className="suround-muugal-selection"> 
     <div className="header-muugal-selection">
       <h2 className="h2-header-muugal-selection">MUUGAL SELECTION</h2>
     </div>
    </div>

    <div className={"muugal-selection"}>
      {files.map((file, index) => (
        <FileContainer key={index} name={file.name} information={file.information} />
      ))}
    </div>

    <div className="order">
      <div className="order-card">
        <p className="order-card-header">KAS EI LEIDNUD SEDA MIDA VAJA?</p>
        <p>Leia sobiv mudel siit<br/>
         <p className="link-3">
          <a href="https://cults3d.com/" className="link" >cults3d</a> <a href="https://pinshape.com/" className="link">pinshape</a> <a href="https://thingiverse.com/" className="link">thingiverse</a>
         </p><br/>
         Lisa fail siia
        </p>
        <div className="kauge">
         <span className="upload-btn-wrapper">
          <button className="btn">Upload a file</button>
          <input type="file" name="myfile" />
         </span>
          <span>
          <button className="order-btn">ORDER</button>
          </span>
         </div>
        
        
      </div>
    </div>
   </span>
  );
};
