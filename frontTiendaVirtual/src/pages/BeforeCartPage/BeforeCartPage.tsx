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

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };



  return (
    <div className="relative h-full">
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 h-screen">
          <div className="w-full mt-3 h-1/2 flex flex-col gap-3">
            <div className="w-100 flex flex-col gap-2">
              <div className="w-full flex flex-col gap-2 border p-3 rounded-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-center">Fecha de {date}</h3>
                  <h4 className="text-center">Total de compra: 500</h4>
                </div>

                {isExpanded && <CartProduct />}
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
