import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';

import AppRoutes from "./AppRoutes";
import Header from "../components/header"
import Footer from "../components/footer"
import { GlobalState } from "../components/globalState";

import "./index.scss";

function App() {
  return (
    <GlobalState>
      <div className="container app-container" id="app">
        <Router>
          <Header />
          <AppRoutes />
          <Footer />
        </Router>
      </div>
      <Analytics />
    </GlobalState>
  );
}

App.propTypes = {};

export default App;