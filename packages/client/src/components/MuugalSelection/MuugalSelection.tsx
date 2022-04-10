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
    <div className={"muugal-selection"}>
      {files.map((file, index) => (
        <FileContainer key={index} name={file.name} information={file.information} />
      ))}
    </div>
  );
};
