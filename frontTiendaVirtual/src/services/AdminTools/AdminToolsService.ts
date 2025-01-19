import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "@/config/ApiConfig";
import { AuthUtils } from "@/utils/AuthUtils";
import { GenericResponse } from "../GenericResponse";
import { GetUsers } from "./Props/GetUsers";
import { GetFilteredProductsPaginate } from "./Props/GetFilteredProductsPaginate";

/**
 * Manejo del servicio de Administrador,
 * Unicamente aquellos usuarios con rol administrador podrán utilizar
 * esta api
 */
export class AdminToolsService {
  private apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL + "/api/adminTools",
      headers: {
        "Content-Type": API_CONFIG.CONTENT_TYPE,
        Authorization: "Bearer " + AuthUtils.getAuthDetails().token,
      },
    });
  }

  /**
   * Obtencion de todos los usuarios paginados y filtrados segun el username
   * en caso de no querer filtrar por nombre, hacer que el username sea un undefined o un string vacio
   * @param param0 
   * @returns 
   */
  async getUsers({
    page,
    username,
  }: {
    page: number;
    username: string;
  }): Promise<GetUsers> {
    try {
      const response = await this.apiInstance.get("/users", {
        params: {
          page: page,
          username: username,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const genericResponse: GenericResponse = error.response.data;
        throw genericResponse;
      } else {
        console.error("Unknown error:", error);
        throw {
          message: "An unexpected error occurred",
          status: 500,
          error: true,
        } as GenericResponse;
      }
    }
  }

  /**
   * Bloquea y desbloquea a un usuario por su nombre de usuario
   * @param username 
   * @returns 
   */
  async blockAndUnblockUserByUsername(
    username: string
  ): Promise<GenericResponse> {
    try {
      const response = await this.apiInstance.delete(`/users/${username}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const genericResponse: GenericResponse = error.response.data;
        throw genericResponse;
      } else {
        console.error("Unknown error:", error);
        throw {
          message: "An unexpected error occurred",
          status: 500,
          error: true,
        } as GenericResponse;
      }
    }
  }

  /**
   * Obtiene un listado de todos los productos de manera paginada
   * Si no se le quiere pasar el campo 'name' (nombre del producto), pasar un undefined o un string vacio
   * @param param0 
   * @returns 
   */
  async getFilteredProductsPaginate({
    page,
    name,
  }: {
    page: number;
    name: string;
  }): Promise<GetFilteredProductsPaginate> {
    try {
      const response = await this.apiInstance.get(`/products`, {
        params: {
          page: page,
          name: name,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const genericResponse: GenericResponse = error.response.data;
        throw genericResponse;
      } else {
        console.error("Unknown error:", error);
        throw {
          message: "An unexpected error occurred",
          status: 500,
          error: true,
        } as GenericResponse;
      }
    }
  }

  /**
   * Bloquea y desbloquea un producto segun el id del producto
   * @param id 
   * @returns 
   */
  async blockUnblockProductById(id: number): Promise<GenericResponse> {
    try {
      const response = await this.apiInstance.delete(`/product/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const genericResponse: GenericResponse = error.response.data;
        throw genericResponse;
      } else {
        console.error("Unknown error:", error);
        throw {
          message: "An unexpected error occurred",
          status: 500,
          error: true,
        } as GenericResponse;
      }
    }
  }

  /**
   * Alterna el rol de un usuario añadiendole o quitandole el rol bussiness
   * @param username 
   * @returns 
   */
  async updateUserToBussiness(username: string): Promise<GenericResponse> {
    try {
      const response = await this.apiInstance.put(`/users/update/bussiness/${username}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const genericResponse: GenericResponse = error.response.data;
        throw genericResponse;
      } else {
        console.error("Unknown error:", error);
        throw {
          message: "An unexpected error occurred",
          status: 500,
          error: true,
        } as GenericResponse;
      }
    }
  }
}
