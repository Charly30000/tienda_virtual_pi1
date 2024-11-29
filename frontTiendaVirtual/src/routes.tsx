import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

const AppRoutes = () => (
  <Router>
    <Routes>
        <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
);


export default AppRoutes;