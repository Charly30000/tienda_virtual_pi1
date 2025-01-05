import React, { useState } from "react";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [products] = useState([
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Grapes" },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchResults = (
    results: { id: number; name: string }[],
    query: string
  ) => {
    setFilteredProducts(results);
    setSearchQuery(query);
  };

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
          Logo
        </Link>

        <Navbar products={products} onSearch={handleSearchResults} />

        <Link to="/cart">
          <ShoppingBasket
            sx={{ color: "white" }}
            fontSize="large"
            className="cursor-pointer"
          />
        </Link>
      </div>

      {searchQuery && (
        <div className="bg-white p-4 rounded-md mt-4 shadow-lg max-h-[300px] overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="py-2">
                {product.name}
              </div>
            ))
          ) : (
            <p>Producto no encontrados</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
