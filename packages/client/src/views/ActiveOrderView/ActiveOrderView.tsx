import React from "react";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import "./activeOrderView.scss";

export const ActiveOrderView: React.FC = () => {




  return(
  <>
   <ProfileHeader />

    <div className="userinfo-background">
      <div className="userinfo">
        <h2 className="userinfo-header">Tee Hinnapakkumine</h2>
        <div className="NewOrder">
          <ul className="userpage-menu-list">
            <li>
              <div className="NewOrder-3DFail">3D fail, ja print settings</div>
            </li>
            <li>
              <div>
                <ul className="userinfo-list">
                  <li>
                    <p>Värv</p>
                  </li>
                  <li>
                    <p className="userinfo-info">#EF3340</p>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="userinfo-list">
                  <li>
                    <p>Kogus</p>
                  </li>
                  <li>
                    <p className="userinfo-info">2</p>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="order-special">
                  <li>
                    <p>Lisainfo:</p>
                  </li>
                  <li>
                    <p>Mingi erisoov</p>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <input type="number" placeholder="Aeg Päevades" className="offer-time" />
              <input type="text" placeholder="Hind" className="offer-time" />
              <button className="userinfo-btn-style">Saada</button>
            </li>
            <li>
              <span className="taimer">taimer:60min</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="userinfo-background">
      <div className="userinfo">
        <h2 className="userinfo-header">Töös Tellimused</h2>
        <div className="NewOrder">
          <ul className="userpage-menu-list">
            <li>
              <div className="NewOrder-3DFail">3D fail, ja print settings</div>
            </li>
            <li>
              <div>
                <ul className="userinfo-list">
                  <li>
                    <p>Värv</p>
                  </li>
                  <li>
                    <p className="userinfo-info">#EF3340</p>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="userinfo-list">
                  <li>
                    <p>Kogus</p>
                  </li>
                  <li>
                    <p className="userinfo-info">2</p>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="order-special">
                  <li>
                    <p>Lisainfo:</p>
                  </li>
                  <li>
                    <p>Mingi erisoov</p>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div>
                <ul className="order-special">
                  <li>
                    <p>Sihtkoht:</p>
                  </li>
                  <li>
                    <p className="userinfo-info">Jõhvi Tsentraal</p>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="order-special">
                  <li>
                    <p>Saaja nimi:</p>
                  </li>
                  <li>
                    <p className="userinfo-info">Meelis</p>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="order-special">
                  <li>
                    <p>Telefon:</p>
                  </li>
                  <li>
                    <p className="userinfo-info">+372 545 41010</p>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="order-special">
                  <li>
                    <p>Saaja e-post:</p>
                  </li>
                  <li>
                    <p className="userinfo-info">võlts@gmail.com</p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        {/* <div className="NewOrder">
              <ul className="userpage-menu-list">
                <li>
                  <label className="userinfo-info">Infill:</label><br>
                  <input type="text" id="fname" className="offer-time"><br>
                  <label  className="userinfo-info">Bed Temp:</label><br>
                  <input type="text" id="lname" className="offer-time"><br>
               </li>
               <li>
                <button className="btn-image">Image</button>
                <button className="userinfo-btn-style">Tellimus Valmis</button>
               </li>
            </ul>
          </div>       */}
      </div>
    </div>

    <div className="userinfo-background">
      <div className="userinfo">
        <h2 className="userinfo-header">See Kuu Täidetud Tellimused</h2>
        <div className="NewOrder">
          <ul className="userpage-menu-list">
            <li>
              <div>
                <ul className="userinfo-list">
                  <li>
                    <p>Tellimuste arv</p>
                  </li>
                  <li>
                    <p className="userinfo-info">12</p>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div>
                <ul className="userinfo-list">
                  <li>
                    <p>Teenitud summa</p>
                  </li>
                  <li>
                    <p className="userinfo-info">200eurot</p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>)
};
