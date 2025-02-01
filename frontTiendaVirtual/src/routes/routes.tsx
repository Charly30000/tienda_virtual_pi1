import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage/HomePage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage/RegisterPage";
import AdminProductsToolsPage from "@/pages/AdminProductsToolsPage/AdminProductsToolsPage";
import AdminPersonToolsPage from "@/pages/AdminPersonToolsPage/AdminPersonToolsPage";
import CartPage from "@/pages/CartPage/CartPage";
import { BussinessToolsPage } from "@/pages/BussinessToolsPage/BussinessToolsPage";
import PaymentPage from "@/pages/PaymentPage/PaymentPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage/PrivacyPolicyPage";
import ProductPage from "@/pages/ProductPage/ProductPage";
import BeforeCartPage from "@/pages/BeforeCartPage/BeforeCartPage";
import { TestPage } from "@/pages/TestPage/TestPage";
import { CreateProductPage } from "@/pages/CreateProductPage/CreateProductPage";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin-products-tools" element={<AdminProductsToolsPage />} />
      <Route path="/admin-person-tools" element={<AdminPersonToolsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/bussiness-tools" element={<BussinessToolsPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/historic-cart" element={<BeforeCartPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/testPage" element={<TestPage/>} />
      <Route path="/create-product" element={<CreateProductPage/>} />
    </Routes>
  </Router>
);

export default AppRoutes;
