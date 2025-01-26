import { create } from "zustand";

export interface ProductState {
  name: string;
  order: "asc" | "desc" | "";
  price: "asc" | "desc" | "";
}

type Action = {
  changeName: (productName: string) => string;
  changeNewestOrder: () => string;
  changePriceOrder: () => string;
  flushOrder: () => void;
  flushPrice: () => void;
  getState: () => ProductState;
};

const initialState: ProductState = {
  name: "",
  order: "desc",
  price: "",
};

/**
 * Hook de Zustand para manejar el estado de la busqueda de producto
 */
export const useProductStateStore = create<ProductState & Action>()((set, get) => ({
  ...initialState,
  changeName(productName: string) {
    set({ name: productName });
    return get().name;
  },
  changeNewestOrder() {
    if (get().order === "asc" || get().order === "") {
      set({ order: "desc" });
    } else {
      set({ order: "asc" });
    }
    return get().order;
  },
  changePriceOrder() {
    if (get().price === "asc" || get().price === "") {
      set({ price: "desc" });
    } else {
      set({ price: "asc" });
    }
    return get().price;
  },
  flushOrder() {
    set({ order: "" });
  },
  flushPrice() {
    set({ price: "" });
  },
  getState() {
    return get();
  }
}));
