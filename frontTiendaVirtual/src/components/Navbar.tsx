import React, { useState } from "react";

interface NavbarProps {
  products: { id: number; name: string }[];
  onSearch: (filtered: { id: number; name: string }[], query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ products, onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    onSearch(filtered, value);
  };

  return (
    <div className="w-full mr-3">
      <input
        placeholder="Search products..."
        className="w-full bg-white px-2 py-1 rounded-md border-none"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Navbar;
