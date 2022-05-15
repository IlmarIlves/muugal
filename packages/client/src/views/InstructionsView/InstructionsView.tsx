import React from "react";
import "./instructionsView.scss";

export const InstructionsView: React.FC = () => (
  <>
    <div className="userpage-menu">
      <ul className="userpage-menu-list">
        <li className="userpage-menu-text">Profile</li>
        <li>|</li>
        <li className="userpage-menu-text">Active Orders</li>
        <li>|</li>
        <li className="userpage-menu-text">Portfolio</li>
        <li>|</li>
        <li className="userpage-menu-text">Instructions</li>
      </ul>
    </div>

    <div className="portfolio-background">
      <div className="userinfo">
        <h2 className="userinfo-header">Instructions</h2>
        <div>
          <p>
            <b>1.Hinnapakkumine</b>
            Teile saadetakse gmailile ning telefonile teade uuest tellimusest. (Pane profiili lehe link) näete tellimuse
            detaile. Seejärel esitage hinnapakkumine ning tööks kuluv aeg. Parim pakkumine valitakse.
            <b>2.Tellimuse vormistamine</b>
            Juhul, kui teie pakkumine osutub valituks, siis saadetakse teile kogu vajalik info (Pane profiili lehe
            link). Lisaks on teil võimalik kliendiga võtta läbi antud lehe ühendust kui teil on ettepanekuid, pakkumisi,
            või esineb pretensioone.
            <b>3. Tellimuse saatmine</b>
            Valmis toode tuleb saata Itella smartposti kaudu tellijale. Peale välja vallituks osutumist saadetakse
            saatmis informatsioon (Pane profiili lehe link)
            <b>Oluline!</b>
            Teie töö kvaliteeti kontrollitakse iga kuu läbi teatud tellimuste. Juhul kui toode ei vasta standarditele
            lukustatakse teie konto.
          </p>
        </div>
      </div>
    </div>
  </>
);
