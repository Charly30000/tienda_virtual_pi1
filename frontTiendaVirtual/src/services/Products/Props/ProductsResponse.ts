export interface ProductsResponse {
    pages:    Pages;
    products: Product[];
}

export interface Pages {
    actualPage: number;
    totalPages: number;
}

export interface Product {
    id:           number;
    name:         string;
    description:  string;
    image:        string;
    price:        number;
    quantity:     number;
    sold:         number;
    productOwner: string;
    isBlocked:    boolean;
    categories:   Category[];
    labels:       Label[];
}

export interface Category {
    id:   number;
    name: string;
}

export interface Label {
    id:   number;
    name: string;
}
