import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="Footer-brand-box">
          <i className="las la-utensils la-2x"></i>
          <h2 className="Footer-header">
            {" "}
            <span>Chef</span>_Available()
          </h2>
        </div>
        <div className="Footer-icon-box">
          <h6 className="Footer-icon-text">
            <i className="Footer-icon las la-mobile fa-2x"></i>
            On your mobile
          </h6>
          <h6 className="Footer-icon-text">
            <i className="Footer-icon lab la-facebook la-2x"></i>
            On facebook
          </h6>
          <h6 className="Footer-icon-text">
            <i className="Footer-icon lab la-instagram la-2x"></i>
            On instagram
          </h6>
          <h6 className="Footer-icon-text">
            <i className="Footer-icon las la-envelope la-2x"></i>
            Contact us
          </h6>
        </div>
        <div className="Footer-copyright">
          <p className="Footer-copyright-text">Copyright© 2020 chef_Available()</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
