import React, { useEffect, useState } from "react";
import { Row } from "./Row";
import { useServices } from "@/hooks/useServices";
import { AdminToolsService } from "@/services/AdminTools/AdminToolsService";
import { GetUsers } from "@/services/AdminTools/Props/GetUsers";
import { Paginator } from "@/components/Paginator";
import { useForm } from "@/hooks/useForm";
import { GenericResponse } from "@/services/GenericResponse";
import Swal from "sweetalert2";

export const FindUsers = () => {
  const [username, setUsername] = useState("");

  const {
    callService: callServiceGetUsers,
    errors: errorsGetUsers,
    data,
  } = useServices<GetUsers>();
  const {
    callService: callServiceUpdateBussinessUser,
    errors: errorsUpdateBussinessUser,
  } = useServices<GenericResponse>();

  const { callService: callServiceBlockUser, errors: errorsBlockUser } =
    useServices<GenericResponse>();

  const adminToolsService = new AdminToolsService();

  const { values, setValues } = useForm<{ users: GetUsers["users"] }>({
    users: [],
  });

  const onClickCheckBussiness = (username: string) => {
    Swal.fire({
      title: `¿Cambiar el rol empresarial de '${username}'?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await callServiceUpdateBussinessUser(
          adminToolsService.updateUserToBussiness(username)
        );
        if (data && !data.error) {
          setValues((prev) => ({
            users: prev.users.map((user) =>
              user.username === username
                ? { ...user, isBussiness: !user.isBussiness }
                : user
            ),
          }));
          Swal.fire(
            `Usuario ${username} actualizado correctamente`,
            "",
            "success"
          );
        }
      }
    });
  };

  const onClickCheckBlock = (username: string) => {
    Swal.fire({
      title: `¿Bloquear al usuario '${username}'?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await callServiceBlockUser(
          adminToolsService.blockAndUnblockUserByUsername(username)
        );
        if (data && !data.error) {
          setValues((prev) => ({
            users: prev.users.map((user) =>
              user.username === username
                ? { ...user, isBlocked: !user.isBlocked }
                : user
            ),
          }));
          Swal.fire(
            `Usuario ${username} actualizado correctamente`,
            "",
            "success"
          );
        }
      }
    });
  };

  const onChangePage = async (page: number) => {
    await changePage(page);
  };

  const changePage = async (page: number) => {
    await callServiceGetUsers(adminToolsService.getUsers({ page, username }));
  };

  const onClickFindByUsername = async() => {
    await callServiceGetUsers(adminToolsService.getUsers({ page: 1, username }));
  }

  // Sincronizar datos con el formulario cuando `data` cambia
  useEffect(() => {
    if (data) {
      setValues({ users: data.users });
    }
  }, [data]);

  useEffect(() => {
    changePage(1);
  }, []);

  useEffect(() => {
    if (errorsGetUsers) {
      Swal.fire(
        "Error inesperado",
        "Ha ocurrido un error inesperado, vuelve a intentarlo más tarde: " +
          JSON.stringify(errorsGetUsers),
        "error"
      );
    }
    if (errorsUpdateBussinessUser) {
      Swal.fire(
        "Error inesperado",
        "Ha ocurrido un error inesperado, vuelve a intentarlo más tarde: " +
          JSON.stringify(errorsUpdateBussinessUser),
        "error"
      );
    }
    if (errorsBlockUser) {
      Swal.fire(
        "Error inesperado",
        "Ha ocurrido un error inesperado, vuelve a intentarlo más tarde: " +
          JSON.stringify(errorsBlockUser),
        "error"
      );
    }
  }, [errorsGetUsers, errorsUpdateBussinessUser, errorsBlockUser]);

  return (
    <div className="relative overflow-hidden shadow-md sm:rounded-lg p-4 bg-white">
      {/* Barra de búsqueda con botón */}
      <div className="flex items-center justify-end flex-wrap md:flex-nowrap space-x-3 pb-4 bg-white dark:bg-gray-900">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nombre de usuario..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={onClickFindByUsername}
        >
          Buscar
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden">
        <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3">
                Usuario empresarial
              </th>
              <th scope="col" className="px-6 py-3">
                Usuario bloqueado
              </th>
            </tr>
          </thead>
          <tbody>
            {values.users.map((u, idx) => (
              <Row
                key={idx}
                username={u.username}
                email={u.email}
                isBussiness={u.isBussiness}
                isBlocked={u.isBlocked}
                onClickCheckBussiness={onClickCheckBussiness}
                onClickCheckBlock={onClickCheckBlock}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Paginator
          currentPage={data?.pages.actualPage || 1}
          totalPages={data?.pages.totalPages || 1}
          onChangePage={onChangePage}
        />
      </div>
    </div>
  );
};
