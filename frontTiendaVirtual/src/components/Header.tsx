import React, { useEffect, useState } from "react";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import icon from "@/assets/img/logo.png";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="w-full bg-blue-950 px-5 py-2 flex flex-col">
      <div className="flex justify-between items-center">
        <MenuIcon
          sx={{ color: "white" }}
          fontSize="large"
          className="cursor-pointer"
          onClick={toggleSidebar}
        />

        <Link to="/" className="uppercase text-white px-3">
          <img src={icon} alt="logo" className="w-[50px]" />
        </Link>

        <Navbar/>

        <Link to="/cart">
          <ShoppingBasket
            sx={{ color: "white" }}
            fontSize="large"
            className="cursor-pointer mr-2"
          />
        </Link>

        <Link
          to="/login"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Header;