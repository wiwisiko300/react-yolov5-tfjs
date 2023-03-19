import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import App from "./App";
import Conclusion from "./components/Conclusion";
import HomePage from "./components/HomePage";
import Questionnaire from "./components/Questionnaire";

export default class Routes_ extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Camera" element={<App />} />
          <Route path="/Questionnaire" element={<Questionnaire />} />
          <Route path="/Conclusion" element={<Conclusion />} />
        </Routes>
      </div>
    );
  }
}
