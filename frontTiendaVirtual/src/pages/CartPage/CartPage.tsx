import CartProduct from "@/components/CartProduct";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

const CartPage = () => {
  const [sidebarOpen, setSiebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSiebarOpen(!sidebarOpen);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="relative h-full">
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 h-screen">
          <div className="w-full mt-3 h-1/2 flex  gap-3">
            <div className="w-3/4 flex flex-col gap-2">
              <div className="flex items-center border p-3 rounded-sm justify-end  gap-3">
                <h3 className="w-2/6">Producto</h3>

                <p className="w-1/6">Precio</p>

                <p className="w-1/6">Cantidad</p>

                <h4 className="w-1/6">Subtotal</h4>
              </div>

              <CartProduct />
              <CartProduct />

              <CartProduct />

              <button
                type="button"
                className="w-full py-3 bg-blue-500 rounded-lg text-white">
                Actualizar
              </button>
            </div>

            <div className="w-1/4 px-3 shadow-lg bg-blue-50 rounded-lg flex flex-col items-center justify-center gap-5">
              <h3>Productos totales: 3</h3>

              <h4>Total: $1200</h4>

              <button
                type="button"
                onClick={toggleModal}
                className="w-full py-3 bg-blue-500 rounded-lg text-white">
                Finalizar
              </button>
            </div>
          </div>
        </div>

        {modalOpen && (
          <div className="fixed top-0 w-full h-full  z-50 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-lg shadow-lg">
              <h2>¿Estas seguro de querer realizar esta compra?</h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-400 py-3 px-4 text-white rounded">
                  Cancelar
                </button>

                <button
                  type="button"
                  className="bg-blue-500 py-3 px-4 text-white rounded">
                  Aceptar
                </button>
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
