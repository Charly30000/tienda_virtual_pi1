import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "@/config/ApiConfig";
import { AuthUtils } from "@/utils/AuthUtils";
import { GetProducts } from "./Props/GetProducts";
import { GenericResponse } from "../GenericResponse";
import { CreateProductResponse } from "./Props/CreateProductResponse";
import { CreateProductRequest } from "./Props/CreateProductRequest";

/**
 * Manejo del servicio de las herramientas empresariales
 */
export class BussinessToolsService {
  private apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL + "/api/bussinessTools",
      headers: {
        "Content-Type": API_CONFIG.CONTENT_TYPE,
        Authorization: "Bearer " + AuthUtils.getAuthDetails().token,
      },
    });
  }

  /**
   * Obtenemos un listado de productos del usuario que realiza la peticion de manera paginada
   * @param page 
   * @returns 
   */
  async getProducts(page: number): Promise<GetProducts> {
    try {
      const response = await this.apiInstance.get("/products", {
        params: {
            page: page
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
   * El usuario bloquea un producto propiamente de él
   * @param id 
   * @returns 
   */
  async blockProduct(id: number): Promise<GetProducts> {
    try {
      const response = await this.apiInstance.delete(`/delete/product/${id}`);
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
   * El usuario crea un producto nuevo
   * @param id 
   * @throws GenericResponse, ProductError
   */
  async createProduct(
    product: CreateProductRequest,
    image?: File
  ): Promise<CreateProductResponse> {
    try {
      // Creamos el objeto FormData
      const formData = new FormData();
      // Serializamos el producto como JSON
      formData.append("product", JSON.stringify(product));
      if (image) {
        // Agregamos la imagen si está disponible
        formData.append("image", image); 
      }

      const response = await this.apiInstance.post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
   * El usuario actualiza un producto existente
   * @param id 
   * @throws GenericResponse, ProductError
   */
  async updateProduct(
    id: number,
    product: CreateProductRequest,
    image?: File
  ): Promise<CreateProductResponse> {
    try {
      // Creamos el objeto FormData
      const formData = new FormData();
      // Serializamos el producto como JSON
      formData.append("product", JSON.stringify(product));
      if (image) {
        // Agregamos la imagen si está disponible
        formData.append("image", image); 
      }

      const response = await this.apiInstance.put(`/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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

}
