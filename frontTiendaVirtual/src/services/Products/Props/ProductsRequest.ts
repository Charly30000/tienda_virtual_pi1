export interface ProductRequest {
    page: number;
    order: "asc" | "desc"; 
    price: "asc" | "desc"; 
    name: string;
}