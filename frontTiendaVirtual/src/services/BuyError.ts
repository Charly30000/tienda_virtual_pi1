import { GenericResponse } from "./GenericResponse";

export interface BuyError extends GenericResponse {
    products: Product[];
}

export interface Product {
    id:                  number;
    name:                string;
    productOwner:        string;
    isBlocked:           boolean;
    available:           number;
    requested:           number;
    productOwnerBlocked: boolean;
}
