import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "@/config/ApiConfig";
import { LoginRequest, LoginResponse } from "./Props/Login";
import { RegisterRequest, RegisterResponse } from "./Props/Register";

/**
 * Manejo del servicio de autorización
 */
export class AuthService {
  private apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      headers: {
        "Content-Type": API_CONFIG.CONTENT_TYPE,
      },
    });
  }

  async login({ username, password }: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.apiInstance.post("/login", {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async register({
    username,
    password,
    email,
  }: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await this.apiInstance.post("/api/users/create/user", {
        username,
        password,
        email,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
