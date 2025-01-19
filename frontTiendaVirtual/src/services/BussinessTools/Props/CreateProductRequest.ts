export interface CreateProductRequest {
    name:        string;
    description: string;
    price:       number;
    quantity:    number;
    categories:  Category[];
    labels:      Label[];
}

export interface Category {
    id:   number;
    name: string;
}

export interface Label {
    id:   number;
    name: string;
}
