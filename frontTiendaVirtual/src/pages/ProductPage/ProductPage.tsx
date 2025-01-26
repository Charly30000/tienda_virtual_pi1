import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useTranslate } from "@/hooks/useTranslate";

const ProductPage = () => {
  const [sidebarOpen, setSiebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSiebarOpen(!sidebarOpen);
  };

  const t = useTranslate();

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 h-screen">
          <div className="w-full mt-3 h-1/2 flex  justify-between gap-3">
            <div className="w-1/3 h-3/4">
              <p>ID: 123456</p>

              <img src="src/assets/img/no-image.webp" alt="no image" />
            </div>

            <div className="w-1/3 flex flex-col items-center justify-center shadow-lg bg-blue-50 rounded-lg py-2 text-center gap-3">
              <h3>Play 1</h3>

              <div className="flex items-center gap-3">
                <p>5 en stock</p>

                <p>10 vendidos</p>
              </div>

              <p>Descripcion del producto</p>

              <h4>Categorias</h4>

              <h5>Etiquetas</h5>
            </div>

            <div className="w-1/3 flex flex-col items-center justify-center shadow-lg bg-blue-50 rounded-lg py-2 text-center gap-3">
              <h3>$400</h3>

              <p>5 en stock</p>

              <p>100 en total</p>

              <button
                type="button"
                className="bg-blue-500 py-2 px-5 text-white rounded-lg">
                {t("product", "add")}
              </button>

              <p>Vendido por nosotros</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
