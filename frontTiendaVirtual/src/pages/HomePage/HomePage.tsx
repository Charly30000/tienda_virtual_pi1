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
import { HistoricShoppingCartResponse } from "@/services/ShoppingCart/Props/HistoricShoppingCartResponse";
import { ShoppingCartService } from "@/services/ShoppingCart/ShoppingCartService";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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
    useServices<HistoricShoppingCartResponse>();
  const shoppingCartService = new ShoppingCartService();

  const callTestService = async () => {
    const fetchedData = await callService(shoppingCartService.historic());
    if (errors) {
      console.error(errors);
    }
    if (fetchedData) {
      console.log(fetchedData);
    }
  };

  useEffect(() => {
    callTestService();
  }, []);

  const paginatedData = React.useMemo(() => {
    const allProducts = data ? data.flatMap((entry) => entry.products) : [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

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
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100">
                {t("HomePage", "filterPrice")}
              </button>

              <button
                id="filterNew"
                type="button"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100">
                {t("HomePage", "newProducts")}
              </button>
            </div>
          </div>

          <div className="w-full mt-3 h-1/2">
            <div className="flex justify-between">
              {isLoading ? (
                "Cargando datos..."
              ) : paginatedData.length > 0 ? (
                <div className="flex flex-1 justify-between gap-4">
                  {paginatedData.map((product) => (
                    <Card
                      className="flex items-center p-2 flex-col gap-5 shadow-lg rounded-lg bg-white"
                      key={product.id}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                      quantity={product.quantity}
                    />
                  ))}
                </div>
              ) : (
                "No data available"
              )}
            </div>
          </div>

          <div className="pt-3 flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(
                  (data ? data.flatMap((entry) => entry.products).length : 0) /
                    itemsPerPage
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
