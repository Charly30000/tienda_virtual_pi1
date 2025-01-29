import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useTranslate } from "@/hooks/useTranslate";
import { AdminToolsService } from "@/services/AdminTools/AdminToolsService";

const AdminProductsToolsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("persons");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslate();
  const navigate = useNavigate();
  const adminToolsService = new AdminToolsService();

  useEffect(() => {
    fetchData();
  }, [activeTab, searchQuery]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === "persons") {
        const users = await adminToolsService.getUsers({
          page: 1,
          username: searchQuery,
        });
        setData(users.users);
      } else {
        const products = await adminToolsService.getFilteredProductsPaginate({
          page: 1,
          name: searchQuery,
        });
        setData(products.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const handleToggleBlock = async (id, type) => {
    try {
      if (type === "person") {
        await adminToolsService.blockAndUnblockUserByUsername(id);
      } else {
        await adminToolsService.blockUnblockProductById(id);
      }
      fetchData();
    } catch (error) {
      console.error("Error toggling block:", error);
    }
  };

  return (
    <div>
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <main className="relative bg-slate-100">
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="px-10 py-2">
          <div className="flex gap-4">
            <button
              className={`p-3 ${
                activeTab === "persons"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("persons")}>
              {t("admin", "searchPerson")}
            </button>
            <button
              className={`p-3 ${
                activeTab === "products"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("products")}>
              {t("admin", "searchProduct")}
            </button>
          </div>

          <input
            type="text"
            placeholder={
              activeTab === "persons"
                ? t("admin", "searchPersonByName")
                : t("admin", "searchProductByName")
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-3 p-2 border rounded-lg w-full"
          />

          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <div className="mt-4">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-md bg-slate-100 shadow-md flex justify-between">
                  <p>
                    {activeTab === "persons"
                      ? item.username
                      : `${item.id} - ${item.name}`}
                  </p>
                  <div className="flex gap-4">
                    <label>
                      {t("admin", "isBlocked")}
                      <input
                        type="checkbox"
                        checked={item.isBlocked}
                        onChange={() =>
                          handleToggleBlock(
                            item.id,
                            activeTab === "persons" ? "person" : "product"
                          )
                        }
                      />
                    </label>
                    {activeTab === "persons" && (
                      <label>
                        {t("admin", "isBusinessRole")}
                        <input
                          type="checkbox"
                          checked={item.isBusiness}
                          onChange={() =>
                            adminToolsService.updateUserToBussiness(
                              item.username
                            )
                          }
                        />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminProductsToolsPage;
