import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import { Link } from "react-router-dom";
import { useTranslate } from "@/hooks/useTranslate";

const CompanyToolsPage = () => {
  const [sidebarOpen, setSiebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSiebarOpen(!sidebarOpen);
  };

  const t = useTranslate();

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 h-screen">
          <div className="flex justify-start pt-5">
            <div className="flex flex-col gap-2">
              <Link
                to="/product"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100">
                  {t("companyTools", "newProduct")}
              </Link>

              <button
                id="filterPrice"
                type="button"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100">
                   {t("companyTools", "changeProduct")}
              </button>
            </div>
          </div>

          <div className="w-full mt-3 h-1/2">
            <div className="flex justify-between">
              <Link to="/product">
                <Card />
              </Link>
              <Link to="/product">
                <Card />
              </Link>

              <Link to="/product">
                <Card />
              </Link>

              <Link to="/product">
                <Card />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyToolsPage;
