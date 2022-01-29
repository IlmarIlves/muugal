import React from "react";
import "./itemContainer.scss";

interface FileContainerProps {
  name: string;
  information: string;
}

export const FileContainer: React.FC<FileContainerProps> = ({ name, information }) => {
  return (
    <div className={"item-container"}>
      {name}
      <div className={"item-information"}>
        <p>{information}</p>
      </div>
    </div>
  );
};
