import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface NavbarProps {
  products: { id: number; name: string }[];
  onSearch: (filtered: { id: number; name: string }[], query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ products, onSearch }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    onSearch(filtered, search);

    // Only navigate if the search query changes and the list is updated
    if (filtered.length > 0) {
      navigate("/");
    }
  };

  return (
    <div className="w-full mr-3 flex">
      <input
        placeholder="Search products..."
        className="w-full bg-white px-2 py-1 rounded-md border-none"
        value={search}
        onChange={handleInputChange}
      />
      <button
        onClick={handleSearchClick}
        className="ml-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-500 ease-in duration-100">
        Search
      </button>
    </div>
  );
};

export default Navbar;
