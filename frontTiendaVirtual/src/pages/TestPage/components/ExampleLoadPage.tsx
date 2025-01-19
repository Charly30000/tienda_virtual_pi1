import { useServices } from "@/hooks/useServices";
import { HistoricShoppingCartResponse } from "@/services/ShoppingCart/Props/HistoricShoppingCartResponse";
import { ShoppingCartService } from "@/services/ShoppingCart/ShoppingCartService";
import React from "react";

export const ExampleLoadPage = () => {
  /**
   * !IMPORTANTE
   * Cada peticion tendrá un useServices distinto
   * Para tipar useServices y ponerle <HistoricShoppingCartResponse>
   * me baso en lo que me devuelve .historic(), normalmente devuelve Promise<HistoricShoppingCartResponse>,
   * asique le quitamos el Promise y se queda en HistoricShoppingCartResponse
   * De esta manera tienes la ayuda de Typescript para saber que dato recibes
   */
  const { callService, errors, isLoading, data } =
    useServices<HistoricShoppingCartResponse>();
  const shoppingCartService = new ShoppingCartService();

  const callTestService = async () => {
    const data = await callService(shoppingCartService.historic());
    if (errors) {
      console.error(errors);
      // Manejar tipo de error, normalmente es GenericResponse, pero puede ser otro, esta documentado en cada una de las llamadas que devuelvan algo distinto de GenericResponse (Como la de BuyError)
    }
    if (data) {
      console.log("data", data);
    }
  };

  React.useEffect(() => {
    callTestService();
  }, []);

  return (
    <div style={{ border: "1px solid black" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "22px" }}>
        Ejemplo de obtencion de datos cuando se carga la pagina:
      </h1>
      <div style={{ maxHeight: 200, overflow: "auto" }}>
        {isLoading ? (
          "Cargando datos..."
        ) : (
          <pre>{JSON.stringify(data, null, 3)}</pre>
        )}
      </div>
    </div>
  );
};
