import { API_CONFIG } from "@/config/ApiConfig";
import { useServices } from "@/hooks/useServices";
import { BussinessToolsService } from "@/services/BussinessTools/BussinessToolsService";
import { CreateProductResponse } from "@/services/BussinessTools/Props/CreateProductResponse";
import React, { useState } from "react";

export const ExampleUpdateProduct = () => {
  /**
   * !IMPORTANTE
   * Cada peticion tendrá un useServices distinto
   * Para tipar useServices y ponerle <CreateProductResponse>
   * me baso en lo que me devuelve .updateProduct(...), normalmente devuelve Promise<CreateProductResponse>,
   * asique le quitamos el Promise y se queda en CreateProductResponse
   * De esta manera tienes la ayuda de Typescript para saber que dato recibes
   */
  const { callService, errors, isLoading, data } =
    useServices<CreateProductResponse>();
  const shoppingCartService = new BussinessToolsService();

  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]); // Guardar la imagen seleccionada
    }
  };

  const callTestService = async () => {
    const productData = {
      name: "Producto actualizado",
      description: "Descripcion de producto actualizado",
      price: 9999.99,
      quantity: 9999,
      categories: [
        { id: 3, name: "aaaaaaa" },
        { id: 4, name: "1111111" },
      ],
      labels: [
        { id: 3, name: "bbbbbb" },
        { id: 4, name: "22222222" },
      ],
    };

    const data = await callService(
      shoppingCartService.updateProduct(36, productData, selectedImage)
    );

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
        Ejemplo actualizar producto (con imagen)
      </h1>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file-2"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="h-14"
              />
            ) : (
              <img
                src="src/assets/img/no-image.webp"
                alt="no image"
                className="h-14"
              />
            )}
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG (MAX. 10MB)
            </p>
          </div>
          <input
            id="dropzone-file-2"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={callTestService}
          disabled={isLoading}
        >
          Enviar datos
        </button>
      </div>
      <div style={{ maxHeight: 200, overflow: "auto" }}>
        {isLoading ? (
          "Cargando datos..."
        ) : data ? (
          <pre>{JSON.stringify(data, null, 3)}</pre>
        ) : (
          "Clica el boton para crear un nuevo producto (LA IMAGEN ES OPCIONAL)"
        )}
      </div>
      <div>
        {data?.image ? (
          <img src={`${API_CONFIG.BASE_URL}${data.image}`} alt="Uploaded" />
        ) : (
          <img src="src/assets/img/no-image.webp" alt="No image" />
        )}
      </div>
    </div>
  );
};
