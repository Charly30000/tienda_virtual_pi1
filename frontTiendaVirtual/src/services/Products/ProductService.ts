import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "@/config/ApiConfig";
import { GenericResponse } from "../GenericResponse";
import { AuthUtils } from "@/utils/AuthUtils";
import { ProductRequest } from "./Props/ProductsRequest";
import { Product, ProductsResponse } from "./Props/ProductsResponse";
import { productResponseMock } from "./mocks/ProductsResponse.mock";

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
   * Obtiene los productos
   * @returns
   */
  async getProducts({
    page,
    order,
    price,
    name,
  }: ProductRequest): Promise<ProductsResponse> {
    try {
      // Cambiar cuando funcione correctamente
      //   const response = await this.apiInstance.get("/products", {
      //     params: {
      //         page: page,
      //         order: order,
      //         price: price,
      //         name: name
      //     }
      //   });
      //   return response.data;
      return new Promise((resolve) => resolve(productResponseMock));
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
      // Cambiar cuando funcione correctamente
      // const response = await this.apiInstance.get(`/product/${id}`);
      // return response.data;
      return new Promise((resolve) => resolve(productResponseMock.products[0]));
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
