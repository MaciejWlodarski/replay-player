import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/match/:matchId/:roundNo" element={<App />} />
      <Route path="/match/:matchId" element={<App />} />
    </Routes>
  </Router>
);
