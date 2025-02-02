import { useEffect, useState } from "react";
import { Row } from "./Row";
import { useServices } from "@/hooks/useServices";
import { AdminToolsService } from "@/services/AdminTools/AdminToolsService";
import { GetFilteredProductsPaginate } from "@/services/AdminTools/Props/GetFilteredProductsPaginate";
import { Paginator } from "@/components/Paginator";
import { useForm } from "@/hooks/useForm";
import { GenericResponse } from "@/services/GenericResponse";
import Swal from "sweetalert2";

export const FindProducts = () => {
  const [productName, setProductName] = useState("");

  const {
    callService: callServiceGetProducts,
    errors: errorsGetProducts,
    data,
  } = useServices<GetFilteredProductsPaginate>();

  const { callService: callServiceBlockProduct, errors: errorsBlockProduct } =
    useServices<GenericResponse>();

  const adminToolsService = new AdminToolsService();

  const { values, setValues } = useForm<{
    products: GetFilteredProductsPaginate["products"];
  }>({
    products: [],
  });

  const onClickCheckBlock = (
    id: number,
    productName: string,
    isBlocked: boolean
  ) => {
    Swal.fire({
      title: `¿${
        isBlocked ? "Desbloquear" : "Bloquear"
      } el producto '${productName}'?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      icon: "question"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await callServiceBlockProduct(
          adminToolsService.blockUnblockProductById(id)
        );
        if (data && !data.error) {
          setValues((prev) => ({
            products: prev.products.map((product) =>
              product.id === id
                ? { ...product, productBlocked: !product.productBlocked }
                : product
            ),
          }));
          Swal.fire(
            `Producto '${productName}' actualizado correctamente`,
            "",
            "success"
          );
        }
      }
    });
  };

  const changePage = async (page: number, productName: string) => {
    await callServiceGetProducts(
      adminToolsService.getFilteredProductsPaginate({ name: productName, page })
    );
  };

  useEffect(() => {
    if (data) {
      setValues({ products: data.products });
    }
  }, [data]);

  useEffect(() => {
    changePage(1, productName);
  }, []);

  useEffect(() => {
    if (errorsGetProducts) {
      Swal.fire(
        "Error inesperado",
        "Ha ocurrido un error inesperado, vuelve a intentarlo más tarde: " +
          JSON.stringify(errorsGetProducts),
        "error"
      );
    }
    if (errorsBlockProduct) {
      Swal.fire(
        "Error inesperado",
        "Ha ocurrido un error inesperado, vuelve a intentarlo más tarde: " +
          JSON.stringify(errorsBlockProduct),
        "error"
      );
    }
  }, [errorsGetProducts, errorsBlockProduct]);

  return (
    <div className="relative overflow-hidden shadow-md sm:rounded-lg p-4 bg-white">
      <div className="flex items-center justify-end flex-wrap md:flex-nowrap space-x-3 pb-4 bg-white dark:bg-gray-900">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-products"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nombre del producto..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => changePage(1, productName)}
        >
          Buscar
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden">
        <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                Propietario
              </th>
              <th scope="col" className="px-6 py-3">
                Bloqueado
              </th>
            </tr>
          </thead>
          <tbody>
            {values.products.map((p, idx) => (
              <Row
                key={idx}
                id={p.id}
                name={p.name}
                price={p.price}
                userOwner={p.productOwner}
                isBlocked={p.productBlocked}
                onClickCheckBlock={onClickCheckBlock}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Paginator
          currentPage={data?.pages.actualPage || 1}
          totalPages={data?.pages.totalPages || 1}
          onChangePage={(page) => changePage(page, productName)}
        />
      </div>
    </div>
  );
};
