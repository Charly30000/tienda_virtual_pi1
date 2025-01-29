import React, { useEffect, useState } from "react";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ShoppingCartService } from "@/services/ShoppingCart/ShoppingCartService";
import { useServices } from "@/hooks/useServices";
import { HistoricShoppingCartResponse } from "@/services/ShoppingCart/Props/HistoricShoppingCartResponse";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { callService, errors } = useServices<HistoricShoppingCartResponse>();
  const shoppingCartService = new ShoppingCartService();

  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    { id: number; name: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");

  const callTestService = async () => {
    const fetchedData = await callService(shoppingCartService.historic());
    if (errors) {
      console.error(errors);
    }
    if (fetchedData) {
      const flatProducts = fetchedData
        .flatMap((entry) => entry.products)
        .map((product) => ({ id: product.id, name: product.name }));
      setProducts(flatProducts);
    }
  };

  useEffect(() => {
    callTestService();
  }, []);

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
          <img src="src/assets/img/logo.png" alt="logo" className="w-[50px]" />
        </Link>

        <Navbar products={products} onSearch={handleSearchResults} />

        <Link to="/cart">
          <ShoppingBasket
            sx={{ color: "white" }}
            fontSize="large"
            className="cursor-pointer mr-2"
          />
        </Link>

        <Link
          to="/login"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100">
          Logout
        </Link>
      </div>

      {searchQuery && (
        <div className="bg-white p-4 rounded-md mt-4 shadow-lg max-h-[300px] overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="py-2">{product.name}</div>
              </Link>
            ))
          ) : (
            <p>Producto no encontrado</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
