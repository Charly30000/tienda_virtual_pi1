import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import { useTranslate } from "@/hooks/useTranslate";
import { useAuthStore } from "@/store/authStore";
import { useNavigate, useLocation } from "react-router-dom";
import { useServices } from "@/hooks/useServices";
import { ProductsResponse } from "@/services/Products/Props/ProductsRequest";
import { ProductService } from "@/services/Products/ProductService";
import { useProductStateStore } from "@/store/productStateStore";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

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
  const location = useLocation();

  const isUserLogged = useAuthStore((e) => e.isUserLogged);

  const { callService, errors, isLoading, data, setData } =
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
      setData(fetchedData);
      filterProducts(fetchedData.products);
    }
  };

  const filterProducts = (products) => {
    const searchQuery = localStorage.getItem("searchQuery") || "";
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
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
      filterProducts(data.products);
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
      filterProducts(data.products);
    }
  };

  useEffect(() => {
    callProductsService();
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && data) {
      filterProducts(data.products);
    }
  }, [location.pathname, data]);

  useEffect(() => {
    const handleSearchQueryUpdate = () => {
      if (data) {
        filterProducts(data.products);
      }
    };

    window.addEventListener("searchQueryUpdated", handleSearchQueryUpdate);

    return () => {
      window.removeEventListener("searchQueryUpdated", handleSearchQueryUpdate);
    };
  }, [data]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const productsPerPage = filteredProducts.length
    ? Math.ceil(filteredProducts.length / (data?.pages?.totalPages || 1))
    : 0;
  const displayedProducts = filteredProducts.length
    ? filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
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
                onClick={orderByAntique}
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
              {isLoading
                ? "Cargando datos..."
                : displayedProducts.length > 0
                ? displayedProducts.map((product) => (
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
                count={data ? data.pages.totalPages : 0}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;