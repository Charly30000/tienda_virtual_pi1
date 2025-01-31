import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "@/config/ApiConfig";
import { GenericResponse } from "../GenericResponse";
import { AuthUtils } from "@/utils/AuthUtils";
import { ProductRequest } from "./Props/ProductsRequest";
import { Product, ProductsResponse } from "./Props/ProductsResponse";

/**
 * Manejo del servicio de la cesta de la compra del usuario
 */
export class ProductService {
  private apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL + "/api",
      headers: {
        "Content-Type": API_CONFIG.CONTENT_TYPE,
        Authorization: "Bearer " + AuthUtils.getAuthDetails().token,
      },
    });
  }

  /**
   * Obtiene los productos paginados
   * @param page Indica la pagina a buscar
   * @param order Indica si se busca de mas nuevo a más antiguo o al reves (si es un string vacio, de mas nuevo a más antiguo)
   * @param price Indica si se busca de mas barato a más caro o al reves (cuando se introduzca este dato,
   * el campo "order" se ignorará en la peticion)
   * @param name String que contiene la palabra que debe de contener el producto buscado (Si se busca "Station",
   * recibiremos todos los productos que contienen la palabra "Station")
   * @returns ProductsResponse
   */
  async getProducts({
    page,
    order,
    price,
    name,
  }: ProductRequest): Promise<ProductsResponse> {
    try {
      const response = await this.apiInstance.get("/products", {
        params: {
          page: page,
          order: order,
          price: price,
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
   * Obtiene los productos
   * @returns
   */
  async getProduct(id: number): Promise<Product> {
    try {
      const response = await this.apiInstance.get(`/products/${id}`);
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
