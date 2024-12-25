import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  return (
    <div
      className={`absolute top-0 left-0 h-full w-[300px] bg-slate-200 shadow-lg transform transition-transform ${
        sidebarOpen
          ? "translate-x-0 ease-in duration-300"
          : "-translate-x-full ease-out duration-300"
      }`}>
      <div className="py-2 px-3 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Link
            to="/"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 text-center">
            Home
          </Link>

          <Link
            to="/before-cart"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 text-center">
            Cestas Anteriores
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            to="company-tools"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 text-center">
            Herraminetas de Empresa
          </Link>

          <Link
            to="/admin-tools"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 text-center">
            Herramientas de admin
          </Link>
        </div>

        <div className="flex">
          <Link
            to="privacy-policy"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 text-center">
            Privacy Policy
          </Link>

        
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
