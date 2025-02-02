import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { AuthUtils } from "@/utils/AuthUtils";
import { ProductService } from "@/services/Products/ProductService";
import { useServices } from "@/hooks/useServices";
import { Product } from "@/services/Products/Props/ProductsResponse";
import { API_CONFIG } from "@/config/ApiConfig";
import image from "@/assets/img/no-image.webp";
import Swal from "sweetalert2";
import { ShoppingCartService } from "@/services/ShoppingCart/ShoppingCartService";
import { GenericResponse } from "@/services/GenericResponse";

const ProductPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [productAdded, setProductAdded] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const isUserLogged = AuthUtils.getAuthDetails().token !== "";
  const {
    callService: callServiceGetProduct,
    data: dataGetProduct,
    errors: errorsGetProduct,
  } = useServices<Product>();
  const { callService: callServiceAddProduct, errors: errorsAddProduct } =
    useServices<GenericResponse>();

  const productService = new ProductService();
  const shoppingCartService = new ShoppingCartService();

  const getProduct = async () => {
    await callServiceGetProduct(productService.getProduct(Number(id)));
  };

  const onAddProduct = async () => {
    const data = await callServiceAddProduct(
      shoppingCartService.addProduct(Number(id))
    );
    if (data && !data.error) {
      setProductAdded(true);
    }
  };

  useEffect(() => {
    if (!isUserLogged) {
      navigate("/login");
    }
  }, [isUserLogged]);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (errorsGetProduct) {
      Swal.fire(
        "Error al cargar la pagina",
        "Ha ocurrido un error inesperado, vuelve a intentarlo más tarde por favor",
        "error"
      );
    }
    if (errorsAddProduct) {
      Swal.fire(
        "Error al añadir el producto",
        "Ha ocurrido un error inesperado, vuelve a intentarlo más tarde por favor",
        "error"
      );
    }
  }, [errorsGetProduct, errorsAddProduct]);

  return (
    <div className="relative h-full">
      <Header toggleSidebar={toggleSidebar} />
      <main className="relative bg-slate-100 min-h-screen">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="p-4">
          {dataGetProduct ? (
            <div className="bg-white rounded-md shadow-md p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/2 flex justify-center">
                  <img
                    src={`${API_CONFIG.BASE_URL}${dataGetProduct.image}`}
                    alt="product image"
                    className="object-cover rounded-md max-h-96"
                    onError={(e) => (e.currentTarget.src = image)}
                  />
                </div>
                <div className="md:w-1/2">
                  <h1 className="text-2xl font-bold mb-2 text-gray-800">
                    {dataGetProduct.name}
                  </h1>
                  <p className="text-gray-700 mb-4">
                    {dataGetProduct.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-800">
                      Precio:
                      <span className="ml-1 text-blue-600">
                        ${dataGetProduct.price}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Cantidad disponible: {dataGetProduct.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Vendidos: {dataGetProduct.sold}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-gray-700 font-semibold">Categorías:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {dataGetProduct.categories?.map((category) => (
                        <span
                          key={category.id}
                          className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-gray-700 font-semibold">Etiquetas:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {dataGetProduct.labels?.map((label) => (
                        <span
                          key={label.id}
                          className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded"
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">
                      Dueño del producto:{" "}
                      <span className="font-semibold">
                        {dataGetProduct.productOwner}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Disponibilidad:{" "}
                      {dataGetProduct.productBlocked ||
                      dataGetProduct.userOwnerBlocked ||
                      dataGetProduct.sold >= dataGetProduct.quantity ? (
                        <span className="font-semibold text-red-600">No</span>
                      ) : (
                        <span className="font-semibold text-blue-600">Si</span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={onAddProduct}
                    disabled={
                      dataGetProduct.productBlocked ||
                      dataGetProduct.userOwnerBlocked ||
                      dataGetProduct.sold >= dataGetProduct.quantity ||
                      productAdded
                    }
                    className={`px-4 py-2 rounded-md text-white transition-colors
    ${
      dataGetProduct.productBlocked ||
      dataGetProduct.userOwnerBlocked ||
      dataGetProduct.sold >= dataGetProduct.quantity ||
      productAdded
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
                  >
                    {productAdded ? "Añadido!" : "Añadir al carrito"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Estado de carga
            <p className="text-gray-700">Cargando producto...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
