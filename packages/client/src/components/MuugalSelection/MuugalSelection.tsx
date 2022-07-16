import React from "react";
import { useNavigate } from "react-router-dom";
import { FileContainer } from "../ItemContainer/ItemContainer";
import "./muugalSelection.scss";

interface MuugalSelectionProps {
  isUserLoggedIn: boolean;
}

const files = [
  {
    name: "Box ",
    information: "",
    url: "https://muugal-aws-bucket.s3.amazonaws.com/files/0e2d1a55-67d0-4405-9d0e-095786cf275c.stl",
  },
  {
    name: "Box ",
    // information: "This could be yours",
    url: "https://muugal-aws-bucket.s3.amazonaws.com/files/0e2d1a55-67d0-4405-9d0e-095786cf275c.stl",
  },
  {
    name: "Spartan",
    // information: "This could be yours",
    url: "https://muugal-aws-bucket.s3.amazonaws.com/files/f953fbbf-a414-4538-8071-d5e8ec3a8c53.stl",
  },
  {
    name: "Spartan",
    // information: "This could be yours",
    url: "https://muugal-aws-bucket.s3.amazonaws.com/files/f953fbbf-a414-4538-8071-d5e8ec3a8c53.stl",
  },
];

export const MuugalSelection: React.FC<MuugalSelectionProps> = ({ isUserLoggedIn = false }) => {
  const navigate = useNavigate();

  return (
    <span>
      <div className="suround-muugal-selection">
        <div className="header-muugal-selection">
          <h2 className="h2-header-muugal-selection">MUUGAL SELECTION</h2>
        </div>
      </div>

      <div className={"muugal-selection"}>
        {files.map((file, index) => (
          <FileContainer key={index} name={file.name} information={file.information} url={file.url} />
        ))}
      </div>

      <div className="order">
        <div className="order-card">
          <p className="order-card-header">KAS EI LEIDNUD SEDA MIDA VAJA?</p>
          <p>
            Leia sobiv mudel siit
            <br />
            <p className="link-3">
              <a href="https://cults3d.com/" className="link">
                cults3d
              </a>{" "}
              <a href="https://pinshape.com/" className="link">
                pinshape
              </a>{" "}
              <a href="https://thingiverse.com/" className="link">
                thingiverse
              </a>
            </p>
            <br />
          </p>
          {/* {isUserLoggedIn ? (
            <>
              Lisa fail siia
              <div className="kauge">
                <span className="upload-btn-wrapper">
                  <button className="btn">Upload a file</button>
                  <input type="file" name="myfile" />
                </span>
                <span>
                  <button className="order-btn">ORDER</button>
                </span>
              </div>
            </>
          ) : null} */}
          <span>
            <button className="order-btn" onClick={() => navigate("/order")}>
              ORDER
            </button>
          </span>
        </div>
      </div>
    </span>
  );
};
