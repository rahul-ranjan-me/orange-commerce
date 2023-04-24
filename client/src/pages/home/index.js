import React from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/banner";
import Widgets from "../../components/widgets";

import "./home.scss";

const Home = () => {
  return <div className="home-page">
    <Link to="/products/accessories"><Banner /></Link>
    <Widgets />
  </div>;
};

export default Home;
