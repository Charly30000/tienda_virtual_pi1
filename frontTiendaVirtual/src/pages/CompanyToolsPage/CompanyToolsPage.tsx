import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useTranslate } from "@/hooks/useTranslate";
import { ProductService } from "@/services/Products/ProductService";
import { BussinessToolsService } from "@/services/BussinessTools/BussinessToolsService";

const ProductPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const t = useTranslate();
  const navigate = useNavigate();
  const { id } = useParams();
  const productService = new ProductService();
  const businessToolsService = new BussinessToolsService();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const fetchedProduct = await productService.getProduct(Number(id));
      setProduct(fetchedProduct);
      setIsBlocked(fetchedProduct.isBlocked);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleBlockProduct = async () => {
    try {
      await businessToolsService.blockProduct(Number(id));
      setIsBlocked(true);
      setModalOpen(false);
    } catch (error) {
      console.error("Error blocking product:", error);
    }
  };

  return (
    <div>
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <main className="relative bg-slate-100">
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="px-10 py-2">
          {product && (
            <div className="w-full mt-3 h-1/2 flex justify-between gap-3">
              <div className="w-1/3 h-3/4">
                <img src={product.image || "src/assets/img/no-image.webp"} alt={product.name} />
              </div>
              <div className="w-1/3 flex flex-col items-center justify-center shadow-lg bg-blue-50 rounded-lg py-2 text-center gap-3">
                <h3>{product.name}</h3>
                <p>{isBlocked ? "Producto bloqueado" : `${product.stock} disponibles`}</p>
                <p>{product.sold} vendidos</p>
                <p>{product.description}</p>
                <h4>Categorias: {product.categories.join(", ")}</h4>
                {/* <h5>Etiquetas: {product.tags.join(", ")}</h5> */}
              </div>
              <div className="w-1/3 flex flex-col items-center justify-center shadow-lg bg-blue-50 rounded-lg py-2 text-center gap-3">
                <h3>${product.price}</h3>
                <p>{product.stock} disponibles</p>
                <button
                  type="button"
                  className="bg-red-500 py-2 px-5 text-white rounded-lg"
                  onClick={() => setModalOpen(true)}
                  disabled={isBlocked}
                >
                  {isBlocked ? "Producto bloqueado" : "Bloquear producto"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      {modalOpen && (
        <div className="fixed top-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2>¿Estás seguro de que deseas bloquear este producto?</h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-gray-400 py-2 px-4 text-white rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 py-2 px-4 text-white rounded"
                onClick={handleBlockProduct}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductPage;
