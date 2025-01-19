import { useState, useRef } from "react";

// Define el tipo genérico para los errores
type ServiceError = any;

/**
 * Hook creado para evitar que se envien multiples veces la misma peticion
 * Esto es debido a que React en modo desarrollo recarga varias veces la pagina
 * cada vez que se realiza un cambio en pantalla
 * Este hook lo evita y hace que se realice correctamente la peticion
 * @returns 
 */
export const useServices = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ServiceError | null>(null);
  const [data, setData] = useState<any>(null);
  const hasCalled = useRef(false); // Referencia para rastrear si ya se realizó una llamada

  /**
   * Se le pasa la peticion a realizar
   * @param serviceCall 
   * @returns 
   */
  const callService = async <T extends unknown>(serviceCall: Promise<T>): Promise<T | null> => {
    if (isLoading || hasCalled.current) {
      return null; // Evitar llamadas redundantes
    }

    hasCalled.current = true; // Marcar como llamada realizada
    setIsLoading(true);
    setErrors(null);
    setData(null);

    try {
      const response = await serviceCall;
      setData(response);
      return response; // Devuelve los datos correctamente tipados
    } catch (error) {
      setErrors(error);
      console.error("Error en la llamada al servicio:", error);
      return null;
    } finally {
      setIsLoading(false);
      hasCalled.current = false;
    }
  };

  return {
    callService,
    errors,
    isLoading,
    data,
  };
};
