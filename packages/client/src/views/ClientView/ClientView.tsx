import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { useViewerQuery } from "../../generated/graphql";
import "./clientView.scss";

export const ClientView: React.FC = () => {
  const navigate = useNavigate();

  // const firstName = useState(viewer?.firstName);
  // const lastName = useState(viewer?.lastName);
  // const email = useState(viewer?.email);
  // const telephone = useState(viewer?.telephone);
  // const packageMachineLocation = useState(viewer?.packageMachineLocation);

  const { data, loading, error } = useViewerQuery();

  const viewer = data?.viewer;

  if (viewer === null) {
    navigate("/");
  }

  return (
    <>
      <Header isImageShown={false} />
      <ProfileHeader />
      <div className="clientinfo-background">
        <div className="userinfo">
          <h2 className="userinfo-header">Kasutajateave</h2>

          <div>
            <ul className="userinfo-list">
              <li>
                <p>
                  {viewer?.firstName} {viewer?.lastName}
                </p>
              </li>
              <li>
                <p className="userinfo-info">Kasutaja</p>
              </li>
              <li className="userinfo-btn">
                <button className="userinfo-btn-style">Muuda</button>
              </li>
            </ul>
          </div>

          <div>
            <ul className="userinfo-list">
              <li>
                <p>Email</p>
              </li>
              <li>
                <p className="userinfo-info">{viewer?.email}</p>
              </li>
              <li className="userinfo-btn">
                <button className="userinfo-btn-style">Muuda</button>
              </li>
            </ul>
          </div>

          <div>
            <ul className="userinfo-list">
              <li>
                <p>Telefon</p>
              </li>
              <li>
                <p className="userinfo-info">{viewer?.telephone}</p>
              </li>
              <li className="userinfo-btn">
                <button className="userinfo-btn-style">Muuda</button>
              </li>
            </ul>
          </div>

          <div>
            <ul className="userinfo-list">
              <li>
                <p>Itella pakiautomaat</p>
              </li>
              <li>
                <p className="userinfo-info">{viewer?.packageMachineLocation}</p>
              </li>
              <li className="userinfo-btn">
                <button className="userinfo-btn-style">Muuda</button>
              </li>
            </ul>
          </div>

          <div>
            <ul className="userinfo-list">
              <li>
                <p>Salasõna</p>
              </li>
              {/* <li>
                <p className="userinfo-info">abjbkjka</p>
              </li> */}
              <li className="userinfo-btn">
                <button className="userinfo-btn-style">Muuda</button>
              </li>
            </ul>
          </div>
          <div>
            <button className="userinfo-btn-style">Kustuta konto</button>
          </div>
        </div>
      </div>
    </>
  );
};
