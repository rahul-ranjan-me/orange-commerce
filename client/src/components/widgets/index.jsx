import React from "react";
import { Link } from "react-router-dom";

import "./widgets.scss"

const WidgetsData = [
  "/photos/banner-01.jpeg",
  "/photos/banner-02.jpeg",
  "/photos/banner-03.jpeg",
  "/photos/banner-04.jpeg",
  "/photos/banner-05.jpeg",
];

const Widgets = () => {
  return (
    <div className="widgets">
      {WidgetsData.map((widget, i) => {
        const url = i % 2 === 0 ? "/products/men" : "/products/women";
        return (
          <Link to={url}>
            <img src={widget} />
          </Link>
        );
      })}
    </div>
  );
};

export default Widgets;
