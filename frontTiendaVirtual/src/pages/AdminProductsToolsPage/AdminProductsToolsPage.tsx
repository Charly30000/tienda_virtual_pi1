import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AdminCartProduct from "@/components/AdminCartProduct";

const AdminProductsToolsPage = () => {
  const [sidebarOpen, setSiebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSiebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 h-screen">
          <div className="w-full mt-3 h-1/2">
            <div className="flex gap-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  id="person"
                  placeholder="Buscar persona"
                  className="p-2 border-blue-200 border rounded-lg"
                />
                <input
                  type="text"
                  id="product"
                  placeholder="Buscar producto"
                  className="p-2 border-blue-200 border rounded-lg"
                />
              </div>

              <input
                type="text"
                id="person-product"
                placeholder="Buscar nombre de producto"
                className="p-2 w-full  border-blue-200 border rounded-lg"
              />
            </div>

            <div>
              <AdminCartProduct />
              <AdminCartProduct />
              <AdminCartProduct />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminProductsToolsPage;
