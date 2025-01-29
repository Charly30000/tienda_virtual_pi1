import AdminCartPerson from "@/components/AdminCartPerson";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useServices } from "@/hooks/useServices";
import { GetUsers } from "@/services/AdminTools/Props/GetUsers";
import { GetFilteredProductsPaginate } from "@/services/AdminTools/Props/GetFilteredProductsPaginate";
import { AdminToolsService } from "@/services/AdminTools/AdminToolsService";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const AdminPersonToolsPage = () => {
  const [sidebarOpen, setSiebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleSidebar = () => {
    setSiebarOpen(!sidebarOpen);
  };

  const navigate = useNavigate();

  const isUserLogged = useAuthStore((e) => e.isUserLogged);

  // useEffect(() => {
  //   if (!isUserLogged()) {
  //     navigate("/login");
  //   }
  // }, []);

  const { callService, errors, isLoading, data } = useServices<GetUsers>();
  const adminToolsService = new AdminToolsService();

  const callGetUsersService = async () => {
    const data = await callService(
      adminToolsService.getUsers({ page: 1, username: "" })
    );
    if (errors) {
      console.error(errors);
      // Manejar tipo de error, normalmente es GenericResponse, pero puede ser otro, esta documentado en cada una de las llamadas que devuelvan algo distinto de GenericResponse (Como la de BuyError)
    }
    if (data) {
      console.log(data.users);
    }
  };

  React.useEffect(() => {
    callGetUsersService();
  }, []);

  const {
    callService: callProductService,
    errors: productErrors,
    isLoading: productLoading,
    data: productData,
  } = useServices<GetFilteredProductsPaginate>();

  const callGetProductsService = async () => {
    const data = await callProductService(
      adminToolsService.getFilteredProductsPaginate({ page: 1, name: "" })
    );
    if (errors) {
      console.error(errors);
      // Manejar tipo de error, normalmente es GenericResponse, pero puede ser otro, esta documentado en cada una de las llamadas que devuelvan algo distinto de GenericResponse (Como la de BuyError)
    }
    if (data) {
      console.log(data);
    }
  };

  React.useEffect(() => {
    callGetProductsService();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (data && data.users) {
      const filtered = data.users.filter((user) =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchTerm("");
    setFilteredUsers([]);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 ">
          <div className="w-full mt-3 h-1/2">
            <div className="flex gap-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  id="person"
                  placeholder="Buscar persona"
                  className="p-2 border-blue-200 border rounded-lg"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <input
                  type="text"
                  id="product"
                  placeholder="Buscar producto"
                  className="p-2 border-blue-200 border rounded-lg"
                />
              </div>
            </div>

            {filteredUsers.length > 0 && (
              <ul className="border border-blue-200 rounded-lg mt-2">
                {filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    className="p-2 cursor-pointer hover:bg-blue-100"
                    onClick={() => handleUserClick(user)}>
                    {user.username}
                  </li>
                ))}
              </ul>
            )}

            <div>
              {selectedUsers.map((user) => (
                <AdminCartPerson
                  key={user.id}
                  username={user.username}
                  isBlocked={user.isBlocked}
                  isBussiness={user.isBussiness}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPersonToolsPage;
