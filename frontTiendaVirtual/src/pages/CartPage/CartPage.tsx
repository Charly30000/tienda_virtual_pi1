import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useServices } from "@/hooks/useServices";
import { useTranslate } from "@/hooks/useTranslate";
import {
  Product,
  ShoppingCart,
} from "@/services/ShoppingCart/Props/GetShoppingCartResponse";
import { ShoppingCartService } from "@/services/ShoppingCart/ShoppingCartService";
import { AuthUtils } from "@/utils/AuthUtils";
import { Row } from "./components/Row";
import { useForm } from "@/hooks/useForm";
import { GenericResponse } from "@/services/GenericResponse";
import { Card } from "./components/Card";

const CartPage = () => {
  const isUserLogged = AuthUtils.getAuthDetails().token !== "";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const t = useTranslate();
  const navigate = useNavigate();
  const { callService, errors, data } = useServices<ShoppingCart>();
  const { callService: callServiceUpdate, errors: errorsUpdateItem } =
    useServices<GenericResponse>();
  const { callService: callServiceDeleteItem, errors: errorsDeleteItem } =
    useServices<GenericResponse>();
  const { callService: callServiceBuy, errors: errorsBuy } =
    useServices<GenericResponse>();
  const shoppingCartService = new ShoppingCartService();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleConfirmModal = () => setConfirmModalOpen(!confirmModalOpen);
  const toggleSuccessModal = () => setSuccessModalOpen(!successModalOpen);

  const { values: formValues, setValues } = useForm<Product[]>([]);
  const [total, setTotal] = useState<number | string>(0);

  const onChangeQuantity = async (id: number, quantity: number) => {
    const data = await callServiceUpdate(
      shoppingCartService.updateProduct({ id, quantity })
    );
    if (data && !data.error) {
      setValues((prevValues) =>
        prevValues.map((product) =>
          product.id === id ? { ...product, quantity } : product
        )
      );
    }
  };

  const onDeleteItem = async (id: number) => {
    const data = await callServiceDeleteItem(
      shoppingCartService.deleteProduct(id)
    );
    if (data && !data.error) {
      setValues((prevValues) =>
        prevValues.filter((product) => product.id !== id)
      );
    }
  };

  useEffect(() => {
    if (!isUserLogged) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setTotal(
      formValues
        .reduce((total, p) => total + p.price * p.quantity, 0)
        .toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
    );
  }, [formValues]);

  const getShoppingCart = async () => {
    await callService(shoppingCartService.getShoppingCart());
  };

  const onClickBuyButton = () => {
    toggleConfirmModal();
  };

  const onClickAgreeBuy = async () => {
    const data = await callServiceBuy(shoppingCartService.buy());
    if (data && !data.error) {
      toggleConfirmModal();
      toggleSuccessModal();
      getShoppingCart();
      setValues([]);
    }
  };

  useEffect(() => {
    if (errors) {
      alert("Error al obtener la cesta del usuario");
    }
    if (errorsUpdateItem) {
      alert("Error al actualizar el producto");
    }
    if (errorsDeleteItem) {
      alert("Error al intentar eliminar el producto");
    }
    if (errorsBuy) {
      alert("Error al realizar la compra");
    }
  }, [errors, errorsUpdateItem, errorsDeleteItem, errorsBuy]);

  useEffect(() => {
    if (data) {
      setValues(data.products);
    }
  }, [data]);

  useEffect(() => {
    getShoppingCart();
  }, []);

  return (
    <div className="relative h-full">
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="flex flex-row gap-4 p-4">
          <div className="w-3/4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Imagen</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Producto
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Cantidad
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Precio
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Accion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formValues.map((p) => (
                    <Row
                      key={p.id}
                      id={p.id}
                      image={p.image}
                      name={p.name}
                      price={p.price}
                      quantity={p.quantity}
                      totalAvailable={p.total_available}
                      productBlocked={p.isBlocked || p.userOwnerBlocked}
                      onChangeQuantity={onChangeQuantity}
                      onDeleteItem={onDeleteItem}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contenedor de la tarjeta */}
          <Card
            total={total}
            buttonEnabled={formValues.some(
              (e) =>
                e.isBlocked ||
                e.userOwnerBlocked ||
                e.quantity > e.total_available
            )}
            onClick={onClickBuyButton}
          />
        </div>

        {/* Modal de Confirmación */}
        {confirmModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">
                ¿Desea confirmar la compra?
              </h2>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={toggleConfirmModal}
                  className="bg-gray-400 py-2 px-4 text-white rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={onClickAgreeBuy}
                  className="bg-blue-500 py-2 px-4 text-white rounded"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Compra Exitosa */}
        {successModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-green-600">
                Compra realizada correctamente
              </h2>
              <button
                onClick={toggleSuccessModal}
                className="mt-4 bg-green-500 py-2 px-4 text-white rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
