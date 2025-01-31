import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { useTranslate } from "@/hooks/useTranslate";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ShoppingCartService } from "@/services/ShoppingCart/ShoppingCartService";
import { useServices } from "@/hooks/useServices";
import { ShoppingCart } from "@/services/ShoppingCart/Props/GetShoppingCartResponse";
import CartProduct from "@/components/CartProduct";

const BeforeCartPage = () => {
  const [sidebarOpen, setSiebarOpen] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    setDate(formattedDate);
  }, []);

  const toggleSidebar = () => {
    setSiebarOpen(!sidebarOpen);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const t = useTranslate();

  const navigate = useNavigate();

  const isUserLogged = useAuthStore((e) => e.isUserLogged);

  // useEffect(() => {
  //   if (!isUserLogged()) {
  //     navigate("/login");
  //   }
  // }, []);

  const { callService, errors } = useServices<ShoppingCart>();
  const shoppingCartService = new ShoppingCartService();

  const callTestService = async () => {
    const fetchedData = await callService(shoppingCartService.historic());
    if (errors) {
      console.error(errors);
    }
    if (fetchedData) {
      console.log(fetchedData);
    }
  };

  useEffect(() => {
    callTestService();
  }, []);

  return (
    <div className="relative h-full">
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 ">
          <div className="w-full mt-3 h-1/2 flex flex-col gap-3">
            <div className="w-100 flex flex-col gap-2">
              <div className="w-full flex flex-col gap-2 border p-3 rounded-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-center">
                    {t("beforeCart", "date")} {date}
                  </h3>
                  <h4 className="text-center"> {t("beforeCart", "total")}</h4>
                </div>

                {isExpanded && <CartProduct  />}
              </div>

              <button
                onClick={toggleAccordion}
                type="button"
                className="py-2 px-2 bg-blue-500 w-100 rounded-lg text-white">
                {isExpanded ? "Contraer" : "Expandir"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BeforeCartPage;
