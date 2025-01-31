import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { BussinessProducts } from "./components/BussinessProducts";
import { AuthUtils } from "@/utils/AuthUtils";
import { useNavigate } from "react-router-dom";
import { Paginator } from "@/components/Paginator";
import { useServices } from "@/hooks/useServices";
import { BussinessToolsService } from "@/services/BussinessTools/BussinessToolsService";
import { GetProducts } from "@/services/BussinessTools/Props/GetProducts";
import { GenericResponse } from "@/services/GenericResponse";

export const BussinessToolsPage = () => {
  const isUserLogged = AuthUtils.getAuthDetails().token !== "";
  const isBussinessUser = AuthUtils.getAuthDetails().isBussiness;
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const {
    callService: getProductsService,
    errors: errorsGetProduct,
    data,
  } = useServices<GetProducts>();
  const { callService: blockProductService, errors: errorsBlockProduct } =
    useServices<GenericResponse>();

  const bussinessToolsService = new BussinessToolsService();

  const getProducts = async (page: number) => {
    const data = await getProductsService(
      bussinessToolsService.getProducts(page)
    );
  };

  const onBlockProduct = async (id: number) => {
    await blockProductService(bussinessToolsService.blockProduct(id));
    await getProducts(data?.pages.actualPage || 1);
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  useEffect(() => {
    if (!isUserLogged) {
      navigate("/login");
    }
    if (!isBussinessUser) {
      navigate("/");
    }
  }, []);

  const onChangePage = async (page: number) => {
    getProducts(page);
  };

  useEffect(() => {
    if (errorsGetProduct) {
      alert(JSON.stringify(errorsGetProduct));
    }
    if (errorsBlockProduct) {
      alert(JSON.stringify(errorsBlockProduct));
    }
  }, [errorsGetProduct, errorsBlockProduct]);

  return (
    <div className="relative h-full">
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100">
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="flex flex-col gap-4 p-4">
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Crear nuevo producto
            </button>
          </div>
          <div>
            <BussinessProducts
              products={data?.products || []}
              onBlockProduct={onBlockProduct}
            />
          </div>
          <div>
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
