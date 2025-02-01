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
import Swal from "sweetalert2";

const CartPage = () => {
  const isUserLogged = AuthUtils.getAuthDetails().token !== "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    Swal.fire({
      title: "¿Deseas proceder con esta compra?",
      html: `El total de la compra será de $${total}.<br>La compra se enviará a tu dirección lo antes posible.`,
      showCancelButton: true,
      confirmButtonText: "Continuar con la compra",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await callServiceBuy(shoppingCartService.buy());
        if (data && !data.error) {
          getShoppingCart();
          setValues([]);
          Swal.fire(
            "¡Compra realizada correctamente!",
            "Te llegará a la direccion indicada próximamente",
            "success"
          );
        }
      }
    });
  };

  useEffect(() => {
    if (errors) {
      Swal.fire(
        "Error al obtener la cesta del usuario",
        "Por favor, intentalo de nuevo más tarde",
        "error"
      );
    }
    if (errorsUpdateItem) {
      Swal.fire(
        "Error al actualizar el producto",
        "Por favor, intentalo de nuevo más tarde",
        "error"
      );
    }
    if (errorsDeleteItem) {
      Swal.fire(
        "Error al intentar eliminar el producto",
        "Por favor, intentalo de nuevo más tarde",
        "error"
      );
    }
    if (errorsBuy) {
      Swal.fire(
        "Error al realizar la compra",
        "Por favor, intentalo de nuevo más tarde",
        "error"
      );
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
      </main>
    </div>
  );
};

export default CartPage;
