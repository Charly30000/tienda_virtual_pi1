import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import { Input } from "@mui/material";
import { Link } from "react-router-dom";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className=" w-full bg-blue-950 px-5 py-2 flex justify-between items-center ">
      <HomeIcon
        sx={{ color: "white" }}
        fontSize="large"
        className="cursor-pointer"
        onClick={toggleSidebar}
      />

      <Link to="/" className="uppercase text-white px-3">
        Logo
      </Link>

      <Input
        placeholder="Search products..."
        className="w-full bg-white mr-3 px-2 py-1 rounded-md border-none"
      />

      <Link to="/cart">
        <ShoppingBasket
          sx={{ color: "white" }}
          fontSize="large"
          className="cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default Header;
