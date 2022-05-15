import React from "react";
import "./clientView.scss";

export const ClientView: React.FC = () => (
  <>
    <div className="clientinfo-background">
      <div className="userinfo">
        <h2 className="userinfo-header">Kasutajateave</h2>

        <div>
          <ul className="userinfo-list">
            <li>
              <p>Kasutajanimi</p>
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
              <p className="userinfo-info">näide@gmail.com</p>
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
              <p className="userinfo-info">54541010</p>
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
              <p className="userinfo-info">Ahtme Maxima</p>
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
            <li>
              <p className="userinfo-info">abjbkjka</p>
            </li>
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
