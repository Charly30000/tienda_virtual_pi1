import CartProduct from "@/components/CartProduct";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";

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

  return (
    <div className="relative h-full">
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 h-screen">
          <div className="w-full mt-3 h-1/2 flex flex-col gap-3">
            <div className="w-full flex flex-col gap-2">
              <div className="flex items-center border p-3 rounded-sm justify-end  gap-3">
                <h3 className="w-3/6 text-center">Fecha de {date}  </h3>

                <h4 className="w-3/6 text-center">Total de compra</h4>
              </div>

              <CartProduct />
              <CartProduct />

              <CartProduct />
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="flex items-center border p-3 rounded-sm justify-end  gap-3">
                <h3 className="w-3/6 text-center">Fecha de {date} </h3>

                <h4 className="w-3/6 text-center">Total de compra</h4>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 bg-blue-500 rounded-lg text-white">
              Expandir
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BeforeCartPage;
