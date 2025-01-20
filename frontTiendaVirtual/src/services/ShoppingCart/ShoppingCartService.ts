import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "@/config/ApiConfig";
import { ShoppingCart } from "./Props/GET-ShoppingCartResponse";
import { GenericResponse } from "../GenericResponse";
import { AuthUtils } from "@/utils/AuthUtils";
import { UpdateProduct } from "./Props/UpdateProductRequest";
import { BuyError } from "../BuyError";
import { HistoricShoppingCartResponse } from "./Props/HistoricShoppingCartResponse";

/**
 * Manejo del servicio de la cesta de la compra del usuario
 */
export class ShoppingCartService {
  private apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL + "/api/shoppingCart",
      headers: {
        "Content-Type": API_CONFIG.CONTENT_TYPE,
        Authorization: "Bearer " + AuthUtils.getAuthDetails().token,
      },
    });
  }

  /**
   * Obtiene la shoppingCart del usuario
   * @returns 
   */
  async getShoppingCart(): Promise<ShoppingCart> {
    try {
      const response = await this.apiInstance.get("");
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
   * Añade un producto a la shoppingcart del usuario
   * @param productId 
   * @returns 
   */
  async addProduct(productId: number): Promise<GenericResponse> {
    try {
      const response = await this.apiInstance.get(`/addProduct/${productId}`);
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
   * Actualiza/añade la cantidad que desea el usuario de un producto de la shoppingcart
   * @param param0 
   * @returns 
   */
  async updateProduct({id, quantity}: UpdateProduct): Promise<GenericResponse> {
    try {
      const response = await this.apiInstance.put(`/updateProduct/${id}`, undefined, {
        params: {
          quantity: quantity
        }
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
   * Elimina un producto de la shoppingcart del usuario
   * @param id 
   * @returns 
   */
  async deleteProduct(id: number) {
    try {
      const response = await this.apiInstance.delete(`/removeProduct/${id}`);
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
   * Compra los productos
   * @returns GenericResponse
   * @throws GenericResponse, BuyError
   */
  async buy(): Promise<GenericResponse> {
    try {
      const response = await this.apiInstance.get(`/buy`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const genericResponse: BuyError = error.response.data;
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
   * Obtiene todas las cestas de la compra del usuario (el primer dato es la cesta activa)
   * @returns 
   */
  async historic(): Promise<HistoricShoppingCartResponse> {
    try {
      const response = await this.apiInstance.get("/historic");
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
