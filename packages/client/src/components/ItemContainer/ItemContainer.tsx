import React from "react";
import { Model } from "../Model/Model";
import "./itemContainer.scss";

interface FileContainerProps {
  name: string;
  url: string;
  information?: string;
}

export const FileContainer: React.FC<FileContainerProps> = ({
  name,
  information,
  url = "https://muugal-aws-bucket.s3.amazonaws.com/files/0e2d1a55-67d0-4405-9d0e-095786cf275c.stl",
}) => {
  return (
    <div className="item-container">
      <Model url={url} />
      {name}
      {information != null ? (
        <div className={"item-information"}>
          <p>{information}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
