import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { AuthUtils } from "@/utils/AuthUtils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FindUsers } from "./components/FindUsers/FindUsers";
import { FindProducts } from "./components/FindProducts/FindProducts";

export const AdminToolsPage = () => {
  const isUserLogged = AuthUtils.getAuthDetails().token !== "";
  const isAdminUser = AuthUtils.getAuthDetails().isAdmin;
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [TabPersonas, TabProductos] = ["Personas", "Productos"];
  const [activeTab, setActiveTab] = useState(TabPersonas); // Estado para manejar las pestañas activas

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    if (!isUserLogged) {
      navigate("/login");
    }
    if (!isAdminUser) {
      navigate("/");
    }
  }, []);

  return (
    <div className="relative h-full">
      <Header toggleSidebar={toggleSidebar} />
      <main className="relative bg-slate-100">
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="flex flex-col gap-4 p-4">
          {/* Tabs */}
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="me-2">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === TabPersonas
                      ? "border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-600"
                  }`}
                  onClick={() => setActiveTab(TabPersonas)}
                >
                  Personas
                </button>
              </li>
              <li className="me-2">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === TabProductos
                      ? "border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-600"
                  }`}
                  onClick={() => setActiveTab(TabProductos)}
                >
                  Productos
                </button>
              </li>
            </ul>
          </div>

          <div>
            {activeTab === TabPersonas && (
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <FindUsers/>
              </div>
            )}
            {activeTab === TabProductos && (
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <FindProducts/>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
