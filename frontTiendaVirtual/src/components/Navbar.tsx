import { useProductStateStore } from "@/store/productStateStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const name = useProductStateStore((e) => e.getState().name);
  const changeName = useProductStateStore((e) => e.changeName);
  const onRequestFindProduct = useProductStateStore((e) => e.onRequestFindProduct);

  const handleSearchClick = () => {
    onRequestFindProduct();
    navigate("/");
  };

  return (
    <div className="w-full mr-3 flex">
      <input
        placeholder="Search products..."
        className="w-full bg-white px-2 py-1 rounded-md border-none"
        value={name}
        onChange={e => changeName(e.target.value)}
      />
      <button
        onClick={handleSearchClick}
        className="ml-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-500 ease-in duration-100">
        Buscar
      </button>
    </div>
  );
};

export default Navbar;