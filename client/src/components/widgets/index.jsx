import React from "react";
import { Link } from "react-router-dom";

import "./widgets.scss"

const WidgetsData = [
  "http://fastortheme.com/defaultnew/image/catalog/default_new/banner-01.jpg",
  "http://fastortheme.com/defaultnew/image/catalog/default_new/banner-02.jpg",
  "http://fastortheme.com/defaultnew/image/catalog/default_new/banner-03.jpg",
  "http://fastortheme.com/defaultnew/image/catalog/default_new/banner-04.jpg",
  "http://fastortheme.com/defaultnew/image/catalog/default_new/banner-05.jpg",
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
