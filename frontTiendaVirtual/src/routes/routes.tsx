import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage/HomePage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage/RegisterPage";

const AppRoutes = () => (
  <Router>
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
);


export default AppRoutes;