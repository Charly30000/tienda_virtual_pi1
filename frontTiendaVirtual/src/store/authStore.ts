import { create } from "zustand";

export interface AuthState {
  isAdmin: boolean;
  isUser: boolean;
  isBussiness: boolean;
  token: string;
  username: string;
}

type Action = {
  setAuth: (auth: AuthState) => AuthState;
  getAuthData: () => AuthState;
  isUserLogged: () => boolean;
  reset: () => void;
};

const initialState: AuthState = {
  isAdmin: false,
  isBussiness: false,
  isUser: false,
  token: "",
  username: "",
};

/**
 * Hook de Zustand para manejar el estado del auth
 */
export const useAuthStore = create<AuthState & Action>()((set, get) => ({
  ...initialState,
  setAuth(auth) {
    set({
      isAdmin: auth.isAdmin,
      isBussiness: auth.isBussiness,
      isUser: auth.isUser,
      token: auth.token,
      username: auth.username,
    });
    return get();
  },
  getAuthData() {
    return get();
  },
  isUserLogged() {
    if (get().token === "") {
        return false;
    }
    return true;
  },
  reset() {
    set(initialState);
  },
}));
