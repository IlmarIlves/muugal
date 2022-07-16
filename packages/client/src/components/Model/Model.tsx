import React from "react";
import { StlViewer } from "react-stl-viewer";
interface ModelProps {
  url: string;
}

const style = {
  top: 0,
  left: 0,
  width: "400px",
  height: "400px",
};

export const Model: React.FC<ModelProps> = ({ url }) => {
  return <StlViewer style={style} orbitControls shadows url={url} />;
};
