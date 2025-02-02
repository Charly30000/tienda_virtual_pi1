import { useState, useRef } from "react";

// Define el tipo genérico para los errores
type ServiceError = any;

/**
 * Hook creado para evitar que se envíen múltiples veces la misma petición.
 * Esto es debido a que React en modo desarrollo recarga varias veces la página
 * cada vez que se realiza un cambio en pantalla.
 * Este hook lo evita y hace que se realice correctamente la petición.
 */
export const useServices = <T,>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ServiceError | null>(null);
  const [data, setData] = useState<T | null>(null);
  const hasCalled = useRef(false); // Referencia para rastrear si ya se realizó una llamada

  /**
   * Se le pasa la petición a realizar.
   * @param serviceCall - Una promesa que devuelve un valor de tipo 'T'.
   * @returns Una promesa que resuelve en 'T' o 'null'.
   */
  const callService = async (serviceCall: Promise<T>): Promise<T | null> => {
    if (isLoading || hasCalled.current) {
      return null;
    }

    hasCalled.current = true;
    setIsLoading(true);
    setErrors(null);
    setData(null);

    try {
      const response = await serviceCall;
      setData(response); // Guardar la respuesta tipada en 'data'
      return response; // Devolver la respuesta tipada
    } catch (error) {
      setErrors(error);
      setData(null);
      console.error("Error en la llamada al servicio:", error);
      return null;
    } finally {
      setIsLoading(false);
      hasCalled.current = false; // Cuando termina, permitimos que se pueda volver a realizar la peticion
    }
  };

  return {
    callService,
    errors,
    isLoading,
    data,
  };
};