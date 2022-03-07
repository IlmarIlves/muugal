import React from "react";
import { Header } from "../../components/Header/Header";
import { MuugalSelection } from "../../components/MuugalSelection/MuugalSelection";
import { Viewer } from "../../generated/graphql";
import "./landingPageView.scss";

export interface LandingPageViewProps {
  viewer: Viewer | undefined;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ viewer }) => {
  return (
    <>
      <Header viewer={viewer} />

      <MuugalSelection />

      {/* <!--Orders--> */}

      {/* <div className="orders-ümbris-hall">
        <div className="orders-ümbris-valge">
          <div className="pealkiri">Active Orders</div>
          <div className="orders-ümbris-must">
            <div className="profiil-orders-newOrder">
              <a href="https://www.thingiverse.com/thing:5165613">Order Link</a>
              <span>
                <p>Tellimuse kirjeldus</p>
              </span>
              <div className="dropdown-order">
                <button className="dropbtn-order">Make an offer</button>
                <div className="dropdown-order-content">
                  <div>
                    <div>
                      <input className="kast" type="number" placeholder="Time (hour)" />
                    </div>
                    <div>
                      <input className="kast" type="number" placeholder="Price (euro)" />
                    </div>
                    <form>
                      <button className="submitOrder" type="submit">
                        Submit Offer
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <!--Taimer-->

              <div id="taimer" className="timer"></div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <!--Portfoolio--> */}

      {/* <div className="portfoolio-ümbris">
        <div className="portfoolio-ümbris-valge">
          <div className="portfoolio">
            <div className="profiil-portfoolio">Portfolio</div>
            <div className="profiil-portfoolio1">
              <button type="button" className="button">
                <span className="button-text">Add image</span>
              </button>
            </div>
          </div>
          <div>
            <div className="portfoolio-pildiümbris">
              <img  className="profiil-orders-newOrder-ümbris" src="img/tühipilt.jpg">
            </div>
          </div>
        </div>
      </div> */}

      {/* <!--User Information--> */}

      {/* <div className="portfoolio-ümbris">
        <div className="portfoolio-ümbris-valge">
          <div className="pealkiri">User Information</div>
          <h4 className="userInformation">Username:</h4>
          <h4 className="userInformation">Email Address:</h4>
          <h4 className="userInformation">Phone:</h4>
          <h4 className="userInformation">Bank Account Number:</h4>
          <h4 className="userInformation">Password:</h4>
          <button className="infoVahetus">Change information</button> */}

      {/* <!-- Siin on andmete muutmise tabel, mis tuleb ette siis kui inimene tahab midagi muuta. Selle ligipääsemiseks peab ta esmalt kinnitama oma kasutaja parooli mis tuleb alerdina ette kui ta vajutab nuppu ´´chanege information´´--> */}
      {/* <div>
            <div>
              <input className="kast" type="text" placeholder="Username" />
            </div>
            <div>
              <input className="kast" type="text" placeholder="Email Address" />
            </div>
            <div>
              <input className="kast" type="number" placeholder="Phone" />
            </div>
            <div>
              <input className="kast" type="number" placeholder="Bank Account Number" />
            </div>
            <div>
              <input className="kast" type="password" placeholder="Pasword" />
            </div>
            <form>
              <button className="infoVahetus" type="submit">
                Change information
              </button>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!--Printer Information--> */}
      {/* <div className="portfoolio-ümbris">
        <div className="portfoolio-ümbris-valge">
          <div className="pealkiri">Printer Information</div>
          <h4 className="userInformation">
            <b>Printer Dimensions</b>
          </h4>
          <h4 className="userInformation">Height:</h4>
          <h4 className="userInformation">Width:</h4>
          <h4 className="userInformation">Lenght:</h4>
          <h4 className="userInformation">
            <b>Colors</b>
          </h4>
          <div className="printeriInfo-värv-ümbris">
            <input className="printerInfo-värv" type="color" />
            <p className="userInformation">(Pantone Reference)</p>
          </div>
          <button className="infoVahetus">Change information</button> */}

      {/* <!--Siin on andmete muutmise tabel, mis tuleb ette siis kui inimene tahab midagi muuta. Selle ligipääsemiseks peab ta esmalt kinnitama oma kasutaja parooli mis tuleb alerdina ette kui ta vajutab nuppu ´´chanege information´´--> */}

      {/* <div>
            <div>
              <input className="kast" type="number" placeholder="Height (mm)" />
            </div>
            <div>
              <input className="kast" type="number" placeholder="Width (mm)" />
            </div>
            <div>
              <input className="kast" type="number" placeholder="Lenght (mm)" />
            </div> */}

      {/* <!--Lisaks Värvi ja selle nime muutmisele, tahan et kasutajal oleks võimalik ka uusi värve lisada--> */}

      {/* <div>
              <input className="kast" type="text" placeholder="Pantone Reference" />
            </div>
            <div>
              <input className="printerInfo-värv" type="color" />
            </div>
            <form>
              <button className="infoVahetus" type="submit">
                Change information
              </button>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!--Instructions Manual--> */}

      {/* <div className="portfoolio-ümbris">
        <div className="portfoolio-ümbris-valge">
          <div className="pealkiri">Instructions Manual</div>
          <div>
            <p>
              <b>1.Hinnapakkumine</b>
              <span>
                Teile saadetakse gmailile ning telefonile teade uuest tellimusest. (Pane profiili lehe link) näete
                tellimuse detaile. Seejärel esitage hinnapakkumine ning tööks kuluv aeg. Parim pakkumine valitakse.
              </span>
              <span>2.Tellimuse vormistamine</span>
              Juhul, kui teie pakkumine osutub valituks, siis saadetakse teile kogu vajalik info (Pane profiili lehe
              link). Lisaks on teil võimalik kliendiga võtta läbi antud lehe ühendust kui teil on ettepanekuid,
              pakkumisi, või esineb pretensioone.<span></span>
              3. Tellimuse saatmine
              <span>
                Valmis toode tuleb saata Itella smartposti kaudu tellijale. Peale välja vallituks osutumist saadetakse
                saatmis informatsioon (Pane profiili lehe link)
              </span>
              <span>Oluline!</span>
              Teie töö kvaliteeti kontrollitakse iga kuu läbi teatud tellimuste. Juhul kui toode ei vasta standarditele
              lukustatakse teie konto.
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
};
