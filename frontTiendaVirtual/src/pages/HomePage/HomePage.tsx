import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import { useServices } from "@/hooks/useServices";
import { ProductService } from "@/services/Products/ProductService";
import { useProductStateStore } from "@/store/productStateStore";
import { Paginator } from "@/components/Paginator";
import { ProductsResponse } from "@/services/Products/Props/ProductsResponse";
import Swal from "sweetalert2";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const changePriceOrder = useProductStateStore((e) => e.changePriceOrder);
  const changeNewestOrder = useProductStateStore((e) => e.changeNewestOrder);
  const flushOrder = useProductStateStore((e) => e.flushOrder);
  const flushPrice = useProductStateStore((e) => e.flushPrice);
  const name = useProductStateStore((e) => e.getState().name);
  const order = useProductStateStore((e) => e.getState().order);
  const price = useProductStateStore((e) => e.getState().price);
  const requestFindProduct = useProductStateStore((e) => e.requestFindProduct);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { callService, errors, isLoading, data } =
    useServices<ProductsResponse>();
  const productService = new ProductService();

  const onChangePage = (page: number) => {
    getProducts(page);
  };

  const getProducts = async (page: number) => {
    await callService(
      productService.getProducts({
        name: name,
        order: order,
        price: price,
        page: page,
      })
    );
  };

  const orderByAntique = async () => {
    flushPrice();
    changeNewestOrder();
    const { name, order, price } = useProductStateStore.getState();
    await callService(
      productService.getProducts({
        page: 1,
        name: name,
        order: order,
        price: price,
      })
    );
  };

  const orderByPrice = async () => {
    flushOrder();
    changePriceOrder();
    const { name, order, price } = useProductStateStore.getState();
    await callService(
      productService.getProducts({
        page: 1,
        name: name,
        order: order,
        price: price,
      })
    );
  };

  useEffect(() => {
    getProducts(1);
  }, [requestFindProduct])

  useEffect(() => {
    getProducts(1);
  }, []);

  useEffect(() => {
    if (errors) {
      Swal.fire(
        "Error al cargar los productos",
        "Ha ocurrido un error al cargar los productos:" +
          JSON.stringify(errors),
        "error"
      );
    }
  }, [errors]);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 ">
          <div className="flex justify-end pt-5">
            <div className="flex flex-col gap-2">
              <button
                id="filterPrice"
                type="button"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100"
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

              <button
                id="filterNew"
                type="button"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100"
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
          </div>

          <div className="w-full mt-3 h-1/2">
            <div className="grid grid-cols-4 gap-4">
              {data?.products.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  quantity={product.quantity}
                />
              ))}
            </div>
          </div>

          <div className="pt-10 flex justify-center">
            <Paginator
              currentPage={data?.pages.actualPage || 1}
              totalPages={data?.pages.totalPages || 1}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
