import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import { useTranslate } from "@/hooks/useTranslate";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useServices } from "@/hooks/useServices";
import { ProductsResponse } from "@/services/Products/Props/ProductsRequest";
import { ProductService } from "@/services/Products/ProductService";
import { useProductStateStore } from "@/store/productStateStore";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const changePriceOrder = useProductStateStore((e) => e.changePriceOrder);
  const changeNewestOrder = useProductStateStore((e) => e.changeNewestOrder);
  const flushOrder = useProductStateStore((e) => e.flushOrder);
  const flushPrice = useProductStateStore((e) => e.flushPrice);
  const name = useProductStateStore((e) => e.getState().name);
  const order = useProductStateStore((e) => e.getState().order);
  const price = useProductStateStore((e) => e.getState().price);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const t = useTranslate();

  const navigate = useNavigate();

  const isUserLogged = useAuthStore((e) => e.isUserLogged);

  // useEffect(() => {
  //   if (!isUserLogged()) {
  //     navigate("/login");
  //   }
  // }, []);

  const { callService, errors, isLoading, data } =
    useServices<ProductsResponse>();
  const productService = new ProductService();

  const callProductsService = async () => {
    const fetchedData = await callService(
      productService.getProducts({
        page: 1,
        order: "asc",
        price: "asc",
        name: "",
      })
    );
    if (errors) {
      console.error(errors);
    }
    if (fetchedData) {
      console.log(fetchedData);
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
    }
    if (data) {
      console.log("data", data);
    }
  };

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
    }
    if (data) {
      console.log("data", data);
    }
  };

  useEffect(() => {
    callProductsService();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedData = data
    ? data.products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

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
                onClick={orderByPrice}
                disabled={isLoading}>
                {t("HomePage", "filterPrice")}
              </button>

              <button
                id="filterNew"
                type="button"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100"
                onClick={orderByAntique}
                disabled={isLoading}>
                {t("HomePage", "newProducts")}
              </button>
            </div>
          </div>

          <div className="w-full mt-3 h-1/2">
            <div className="grid grid-cols-4 gap-4">
              {isLoading
                ? "Cargando datos..."
                : paginatedData.length > 0
                ? paginatedData.map((product) => (
                    <Card
                      key={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      quantity={product.quantity}
                    />
                  ))
                : "No data available"}
            </div>
          </div>

          <div className="pt-10 flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(
                  (data ? data.products.length : 0) / itemsPerPage
                )}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;