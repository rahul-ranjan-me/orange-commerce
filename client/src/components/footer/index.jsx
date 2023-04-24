import React from "react";

import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer container">
      <div className="row">
        <div className="col">
        <i className="bi bi-envelope icon-align"></i>
          <div>
            Do you have any question? <br />
            <a href="mailto:email.example@gmail.com">email.example@gmail.com</a>
          </div>
        </div>
        <div className="col-6">
          <div>
            <i className="bi bi-telephone-fill icon-align"></i>
            <div>
              800-140-100 <br />
              <a href="mailto:email.example@gmail.com">
                Mon - Fri: 8:00 - 17:00
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-secondary"
            style={{ float: "right" }}
          >
            Contact form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
