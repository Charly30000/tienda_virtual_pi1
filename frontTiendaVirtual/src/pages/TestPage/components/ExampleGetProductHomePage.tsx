import { useServices } from "@/hooks/useServices";
import { ProductService } from "@/services/Products/ProductService";
import { ProductsResponse } from "@/services/Products/Props/ProductsResponse";
import { useProductStateStore } from "@/store/productStateStore";
import React from "react";

export const ExampleGetProductHomePage = () => {
  const changeName = useProductStateStore((e) => e.changeName);
  const changeNewestOrder = useProductStateStore((e) => e.changeNewestOrder);
  const changePriceOrder = useProductStateStore((e) => e.changePriceOrder);
  const flushOrder = useProductStateStore((e) => e.flushOrder);
  const flushPrice = useProductStateStore((e) => e.flushPrice);
  const name = useProductStateStore((e) => e.getState().name);
  const order = useProductStateStore((e) => e.getState().order);
  const price = useProductStateStore((e) => e.getState().price);

  const { callService, errors, isLoading, data } =
    useServices<ProductsResponse>();

  const productService = new ProductService();

  const orderByAntique = async () => {
    flushPrice();
    changeNewestOrder();
    const { name, order, price } = useProductStateStore.getState();
    const data = await callService(
      productService.getProducts({
        page: 1,
        name: name,
        order: order,
        price: price,
      })
    );
    if (errors) {
      console.error(errors);
      // Manejar tipo de error, normalmente es GenericResponse, pero puede ser otro, esta documentado en cada una de las llamadas que devuelvan algo distinto de GenericResponse (Como la de BuyError)
    }
    if (data) {
      console.log("data", data);
    }
  };

  const orderByPrice = async () => {
    flushOrder();
    changePriceOrder();
    const { name, order, price } = useProductStateStore.getState();
    const data = await callService(
      productService.getProducts({
        page: 1,
        name: name,
        order: order,
        price: price,
      })
    );
    if (errors) {
      console.error(errors);
      // Manejar tipo de error, normalmente es GenericResponse, pero puede ser otro, esta documentado en cada una de las llamadas que devuelvan algo distinto de GenericResponse (Como la de BuyError)
    }
    if (data) {
      console.log("data", data);
    }
  };

  const findByName = async () => {
    const { name, order, price } = useProductStateStore.getState();
    const data = await callService(
      productService.getProducts({
        page: 1,
        name: name,
        order: order,
        price: price,
      })
    );
    if (errors) {
      console.error(errors);
      // Manejar tipo de error, normalmente es GenericResponse, pero puede ser otro, esta documentado en cada una de las llamadas que devuelvan algo distinto de GenericResponse (Como la de BuyError)
    }
    if (data) {
      console.log("data", data);
    }
  };

  React.useEffect(() => {
    const init = async () => {
      const data = await callService(
        productService.getProducts({
          page: 1,
          name: name,
          order: order,
          price: price,
        })
      );
      if (errors) {
        console.error(errors);
        // Manejar tipo de error, normalmente es GenericResponse, pero puede ser otro, esta documentado en cada una de las llamadas que devuelvan algo distinto de GenericResponse (Como la de BuyError)
      }
      if (data) {
        console.log("data", data);
      }
    };

    init();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Introducir el nombre del producto
        </label>
        <input
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={name}
          onChange={(e) => changeName(e.target.value)}
        />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={findByName}
          disabled={isLoading}
        >
          Buscar nombre
        </button>
      </div>
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={orderByAntique}
          disabled={isLoading}
        >
          Filtro por antigüedad:{" "}
          {order === "asc"
            ? "Más antiguo a más nuevo"
            : order === "desc"
            ? "Más nuevo a más antiguo"
            : "Sin uso de este filtro"}
        </button>
      </div>
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={orderByPrice}
          disabled={isLoading}
        >
          Filtro por precio:{" "}
          {price === "asc"
            ? "Más barato a más caro"
            : price === "desc"
            ? "Más caro a más barato"
            : "Sin uso de este filtro"}
        </button>
      </div>
      <div>
        <div>Lista de productos: AQUI IRIAN LAS TARJETAS DE LOS PRODUCTOS</div>
        {data?.products.map((e) => (
          <div key={e.id}>
            {e.name}, id:{e.id}, precio:{e.price}
          </div>
        ))}
      </div>
      <div>------------------------------------------------------------</div>
      <div>
        <div>AQUI IRIA EL PAGINADOR:</div>
        <div>Numero total de paginas: {data?.pages.totalPages}</div>
        <div>Pagina actual: {data?.pages.actualPage}</div>
      </div>
    </div>
  );
};
