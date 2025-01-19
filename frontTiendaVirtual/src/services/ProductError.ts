import { GenericResponse } from "./GenericResponse";

export interface ProductError extends GenericResponse {
    errors: [key: string] [];
}