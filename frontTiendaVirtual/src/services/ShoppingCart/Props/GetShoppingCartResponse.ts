export interface ShoppingCart {
    date:     string;
    products: Product[];
}

export interface Product {
    id:              number;
    name:            string;
    image:           string;
    price:           number;
    quantity:        number;
    sold:            number;
    total_available: number;
    isBlocked:       boolean;
    productOwner:    string;
    userOwnerBlocked: boolean;
}
