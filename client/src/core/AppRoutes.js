import React from "react";
import { useRoutes } from "react-router-dom";

import ROUTES from "../const/routes";

const AppRoutes = () => {
  const element = useRoutes(ROUTES);

  return <div className="app-container">{element}</div>;
};

export default AppRoutes;