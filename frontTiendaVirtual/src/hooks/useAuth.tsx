import { LoginResponse } from "@/services/auth/Props/Login";
import { useAuthStore } from "@/store/authStore";

/**
 * Hook para cargar detalles del usuario al sessionStorage y al gestor de estados
 * @returns
 */
export const useAuth = () => {
  const STORAGE_ITEM = "userdetails";
  const setAuth = useAuthStore((e) => e.setAuth);
  const reset = useAuthStore((e) => e.reset);

  const initUserInstance = () => {
    const userdetails = sessionStorage.getItem(STORAGE_ITEM);
    if (userdetails) {
      setAuth(JSON.parse(userdetails));
    }
  };

  const createUserInstance = (auth: LoginResponse) => {
    const instance = setAuth(auth);
    sessionStorage.setItem(STORAGE_ITEM, JSON.stringify(instance));
  };

  const logout = () => {
    reset();
    sessionStorage.removeItem(STORAGE_ITEM);
  };

  return {
    initUserInstance,
    createUserInstance,
    logout,
  };
};
