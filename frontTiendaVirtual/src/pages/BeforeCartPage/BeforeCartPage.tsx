import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartService } from "@/services/ShoppingCart/ShoppingCartService";
import { useServices } from "@/hooks/useServices";
import { HistoricShoppingCartResponse } from "@/services/ShoppingCart/Props/HistoricShoppingCartResponse";
import HistoricCard from "@/components/HistoricCard";
import { AuthUtils } from "@/utils/AuthUtils";

const BeforeCartPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigate = useNavigate();

  const isUserLogged = AuthUtils.getAuthDetails().token !== "";
  useEffect(() => {
    if (!isUserLogged) {
      navigate("/login");
    }
  }, []);

  const { callService, errors, isLoading, data } =
    useServices<HistoricShoppingCartResponse>();
  const shoppingCartService = new ShoppingCartService();

  const callTestService = async () => {
    const data = await callService(shoppingCartService.historic());
    if (errors) {
      console.error(errors);
    }
    if (data) {
      console.log("data", data);
    }
  };

  useEffect(() => {
    callTestService();
  }, []);

  return (
    <div className="relative h-full">
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 ">
          <div className="w-full mt-3 h-1/2 flex flex-col gap-3">
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              data?.map((item, index) => (
                <HistoricCard
                  key={index}
                  date={item.date}
                  products={item.products}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BeforeCartPage;
