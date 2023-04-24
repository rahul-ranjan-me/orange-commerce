import React from "react";
import PageHeading from "../../components/pageHeading";

import "./paymentSuccessful.scss";

const Home = () => {
  return (
    <div>
      <PageHeading heading="Your payment was successful" />
      <div className="successful-icon">
        <i class="bi bi-bag-check"></i>
      </div>
    </div>
  );
};

export default Home;
