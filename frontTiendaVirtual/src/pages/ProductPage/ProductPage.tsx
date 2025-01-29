import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useTranslate } from "@/hooks/useTranslate";
import { ProductService } from "@/services/Products/ProductService";

const ProductPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const t = useTranslate();
  const navigate = useNavigate();
  const { id } = useParams();
  const productService = new ProductService();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const fetchedProduct = await productService.getProduct(Number(id));
      setProduct(fetchedProduct);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleAddProduct = () => {
    setIsAdded(true);
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
                <div className="flex items-center gap-3">
                  <p>{product.stock} disponibles</p>
                  <p>{product.sold} vendidos</p>
                </div>
                <p>{product.description}</p>
                <h4>Categorias: {product.categories.join(", ")}</h4>
                {/* <h5>Etiquetas: {product.tags.join(", ")}</h5> */}
              </div>
              <div className="w-1/3 flex flex-col items-center justify-center shadow-lg bg-blue-50 rounded-lg py-2 text-center gap-3">
                <h3>${product.price}</h3>
                <p>{product.stock} disponibles</p>
                <button
                  type="button"
                  className={`bg-blue-500 py-2 px-5 text-white rounded-lg ${isAdded ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={handleAddProduct}
                  disabled={isAdded}
                >
                  {isAdded ? "Añadido" : t("product", "add")}
                </button>
                <p>Vendido por nosotros</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;