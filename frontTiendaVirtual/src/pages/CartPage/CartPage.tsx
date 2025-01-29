import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CartProduct from "@/components/CartProduct";
import { useServices } from "@/hooks/useServices";
import { useTranslate } from "@/hooks/useTranslate";
import { ShoppingCart } from "@/services/ShoppingCart/Props/GetShoppingCartResponse";
import { ShoppingCartService } from "@/services/ShoppingCart/ShoppingCartService";

const CartPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const t = useTranslate();
  const navigate = useNavigate();
  const { callService, errors } = useServices<ShoppingCart>();
  const shoppingCartService = new ShoppingCartService();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleModal = () => setModalOpen(!modalOpen);

  const calculateTotalPrice = (cartProducts: any[]) => {
    const total = cartProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Uncomment this if user authentication is required for accessing the cart
  // useEffect(() => {
  //   if (!isUserLogged()) {
  //     navigate("/login");
  //   }
  // }, []);

  const callTestService = async () => {
    const fetchedData = await callService(
      shoppingCartService.getShoppingCart()
    );
    if (errors) {
      console.error(errors);
    }
    if (fetchedData) {
      console.log(fetchedData);
      const flatProducts = Array.isArray(fetchedData)
        ? fetchedData.flatMap((entry) => entry.products)
        : [];
      setProducts(flatProducts);
      calculateTotalPrice(flatProducts);
    }
  };

  useEffect(() => {
    callTestService();
  }, []);

  return (
    <div className="relative h-full">
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2">
          <div className="w-full mt-3 h-1/2 flex gap-3">
            <div className="w-3/4 flex flex-col gap-2">
              <div className="flex items-center border p-3 rounded-sm justify-end gap-3">
                <h3 className="w-2/6">{t("cartPage", "product")}</h3>
                <p className="w-1/6">{t("cartPage", "price")}</p>
                <p className="w-1/6">{t("cartPage", "quantity")}</p>
                <h4 className="w-1/6">{t("cartPage", "subtotal")}</h4>
              </div>

              {products.map((product, index) => (
                <CartProduct
                  key={`${product.id}-${index}`} // Combine id and index for a unique key
                  id={product.id}
                  image={product.image || "./src/assets/img/no-image.webp"}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
              ))}

              <button
                type="button"
                className="w-full py-3 bg-blue-500 rounded-lg text-white"
              >
                {t("cartPage", "update")}
              </button>
            </div>

            <div className="w-1/4 px-3 shadow-lg bg-blue-50 rounded-lg flex flex-col items-center justify-center gap-5">
              <h3>
                {t("cartPage", "productTotal")}: {products.length}
              </h3>

              <h4>
                {t("cartPage", "total")}: ${totalPrice.toFixed(2)}
              </h4>

              <button
                type="button"
                onClick={toggleModal}
                className="w-full py-3 bg-blue-500 rounded-lg text-white"
              >
                {t("cartPage", "finish")}
              </button>
            </div>
          </div>
        </div>

        {modalOpen && (
          <div className="fixed top-0 w-full h-full z-50 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-lg shadow-lg">
              <h2>{t("cartPage", "areUSure")}</h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-400 py-3 px-4 text-white rounded"
                >
                  {t("cartPage", "cancel")}
                </button>

                <Link
                  to="/"
                  type="button"
                  className="bg-blue-500 py-3 px-4 text-white rounded"
                >
                  {t("cartPage", "accept")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
