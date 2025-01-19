import { useServices } from "@/hooks/useServices";
import { ShoppingCartService } from "@/services/ShoppingCart/ShoppingCartService";
import React from "react";

export const ExampleClickButtonPage = () => {
  /**
   * !IMPORTANTE
   * Cada peticion tendrá un useServices distinto
   */
  const { callService, errors, isLoading, data } = useServices();
  const shoppingCartService = new ShoppingCartService();

  const callTestService = async () => {
    console.log("Clicado");
    const data = await callService(shoppingCartService.historic());
    if (errors) {
      console.error(errors);
      // Manejar tipo de error, normalmente es GenericResponse, pero puede ser otro, esta documentado en cada una de las llamadas que devuelvan algo distinto de GenericResponse (Como la de BuyError)
    }
    if (data) {
      console.log("data", data);
    }
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "22px" }}>
        Ejemplo de obtencion de datos cuando se clica en un boton
      </h1>
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={callTestService}
          disabled={isLoading}
        >
          Realizar peticion
        </button>
      </div>
      <div style={{ maxHeight: 200, overflow: "auto" }}>
        {isLoading ? (
          "Cargando datos..."
        ) : data ? (
          <pre>{JSON.stringify(data, null, 3)}</pre>
        ) : (
          "Clica el boton para obtener datos"
        )}
      </div>
    </div>
  );
};
