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

  const [personQuery, setPersonQuery] = useState("");
  const [productQuery, setProductQuery] = useState("");

  const data = [
    { person: "Juan Pérez", product: "Producto A" },
    { person: "María López", product: "Producto B" },
    { person: "Carlos Gómez", product: "Producto C" },
    { person: "Ana Torres", product: "Producto A" },
  ];

  const filteredPersons = data.filter((item) =>
    item.person.toLowerCase().includes(personQuery.toLowerCase())
  );

  const filteredProducts = data.filter((item) =>
    item.product.toLowerCase().includes(productQuery.toLowerCase())
  );

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 h-screen">
          <div className="w-full mt-3 h-1/2">
            <div className="flex gap-6">
              <div className="flex flex-col gap-2 w-1/2">
                <input
                  type="text"
                  id="person"
                  placeholder="Buscar persona"
                  value={personQuery}
                  onChange={(e) => setPersonQuery(e.target.value)}
                  className="p-2 border-blue-200 border rounded-lg"
                />
                {personQuery.trim() && (
                  <div className="flex flex-col gap-2 mt-4">
                    {filteredPersons.length > 0 ? (
                      filteredPersons.map((item, index) => (
                        <div
                          key={index}
                          className="p-3 border rounded-md bg-slate-100 shadow-md">
                          <h3>Persona: {item.person}</h3>
                        </div>
                      ))
                    ) : (
                      <p>No se encontraron personas</p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <input
                  type="text"
                  id="product"
                  placeholder="Buscar producto"
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                  className="p-2 border-blue-200 border rounded-lg"
                />
                {productQuery.trim() && (
                  <div className="flex flex-col gap-2 mt-4">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((item, index) => (
                        <div
                          key={index}
                          className="p-3 border rounded-md bg-slate-100 shadow-md">
                          <h4>Producto: {item.product}</h4>
                        </div>
                      ))
                    ) : (
                      <p>No se encontraron productos</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div >
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
