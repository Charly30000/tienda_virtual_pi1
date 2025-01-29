import React from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "@/hooks/useTranslate";
import { useAuthStore } from "@/store/authStore";

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const t = useTranslate();

  const isAdmin = useAuthStore((e) => e.isAdmin);
  const isUser = useAuthStore((e) => e.isUser);
  const isBussiness = useAuthStore((e) => e.isBussiness);

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
            {t("Sidebar", "home")}
          </Link>

          <Link
            to="/historic-cart"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 text-center">
            {t("Sidebar", "beforeCart")}
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            to="/company-tools"
            className={`bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 text-center ${
              isUser || isAdmin ? "pointer-events-none opacity-50" : ""
            }`}>
            {t("Sidebar", "businessTools")}
          </Link>

          <Link
            to="/admin-products-tools"
            className={`bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 text-center ${
              isUser || isBussiness ? "pointer-events-none opacity-50" : ""
            }`}>
            {t("Sidebar", "adminTools")}
          </Link>
        </div>

        <div className="flex">
          <Link
            to="/privacy-policy"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 text-center">
            {t("Sidebar", "privacyPolicy")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
