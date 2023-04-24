import React from "react";

import "./page-heading.scss";

const PageHeading = ({ heading }) => (
  <div className="page-header">
    <span>
      <h3>{heading}</h3>
    </span>
  </div>
);

export default PageHeading;
