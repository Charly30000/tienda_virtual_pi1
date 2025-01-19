export interface CreateProductResponse {
    id:           number;
    name:         string;
    description:  string;
    image:        string;
    price:        number;
    quantity:     number;
    sold:         number;
    productOwner: string;
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
