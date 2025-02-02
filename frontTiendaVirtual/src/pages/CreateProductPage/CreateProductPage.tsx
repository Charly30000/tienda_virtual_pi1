import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useServices } from "@/hooks/useServices";
import { BussinessToolsService } from "@/services/BussinessTools/BussinessToolsService";
import { CreateProductResponse } from "@/services/BussinessTools/Props/CreateProductResponse";
import { AuthUtils } from "@/utils/AuthUtils";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/hooks/useForm";
import {
  Category,
  Label,
  CreateProductRequest,
} from "@/services/BussinessTools/Props/CreateProductRequest";
import { DynamicSelectGroup } from "@/components/DynamicSelectGroup";
import Swal from "sweetalert2";
import { sanitizeText } from "@/utils/textUtils";
import image from "@/assets/img/no-image.webp";

export const CreateProductPage = () => {
  const isUserLogged = AuthUtils.getAuthDetails().token !== "";
  const isBussinessUser = AuthUtils.getAuthDetails().isBussiness;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();

  const { callService, data: categoriesData } = useServices<Category[]>();
  const { callService: callLabels, data: labelsData } = useServices<Label[]>();
  const { callService: callCreateProduct, data: dataCreate } =
    useServices<CreateProductResponse>();
  const bussinessToolsService = new BussinessToolsService();

  const { values, errors, handleChange, handleSubmit, isInvalid, setValues } =
    useForm<CreateProductRequest>(
      {
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        categories: [],
        labels: [],
      },
      (values) => {
        const errors: {
          [key in keyof CreateProductRequest | "image"]?: string;
        } = {};

        if (!values.name) errors.name = "El nombre es obligatorio";
        if (values.name.length > 250)
          errors.name = "El nombre debe de tener menos de 250 caracteres";
        if (!values.description)
          errors.description = "La descripción es obligatoria";
        if (values.description.length > 3000)
          errors.description =
            "La descripcion debe de tener menos de 3000 caracteres";
        if (values.price <= 0) errors.price = "El precio debe ser mayor a 0";
        if (values.price > 9000000000000)
          errors.price = "El precio maximo es de $9000000000000";
        if (values.quantity <= 0)
          errors.quantity = "La cantidad debe ser mayor a 0";
        if (values.quantity > 2147483647)
          errors.quantity = "La cantidad maxima es de 2147483647 unidades";

        // Validar imagen (si existe)
        if (selectedImage) {
          if (selectedImage.name.length > 100) {
            errors.image =
              "El nombre del archivo no debe superar los 100 caracteres";
          }
          if (selectedImage.size > 10 * 1024 * 1024) {
            errors.image = "El archivo no debe superar los 10MB";
          }
        }

        return errors;
      }
    );

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        callService(bussinessToolsService.getCategories()),
        callLabels(bussinessToolsService.getLabels()),
      ]);
    };
    init();
  }, []);

  useEffect(() => {
    if (!isUserLogged) {
      navigate("/login");
    }
    if (!isBussinessUser) {
      navigate("/");
    }
  }, [isUserLogged, isBussinessUser]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.length > 100) {
        Swal.fire(
          "Imagen no permitida",
          "El nombre del archivo no debe superar los 100 caracteres.",
          "warning"
        );
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire(
          "Imagen no permitida",
          "El archivo no debe superar los 10MB.",
          "warning"
        );
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Swal.fire(
          "Imagen no permitida",
          "Solo se permiten archivos JPG y PNG.",
          "warning"
        );
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (file.name.length > 100) {
        Swal.fire(
          "Imagen no permitida",
          "El nombre del archivo no debe superar los 100 caracteres.",
          "warning"
        );
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire(
          "Imagen no permitida",
          "El archivo no debe superar los 10MB.",
          "warning"
        );
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Swal.fire(
          "Imagen no permitida",
          "Solo se permiten archivos JPG y PNG.",
          "warning"
        );
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onSubmit = async () => {
    if (!isInvalid) {
      await callCreateProduct(
        bussinessToolsService.createProduct(
          {
            name: sanitizeText(values.name).replace("\n", ""),
            categories: values.categories,
            description: sanitizeText(values.description),
            labels: values.labels,
            price: values.price,
            quantity: values.quantity,
          },
          selectedImage || undefined
        )
      );
      Swal.fire({
        title: "¡Producto creado!",
        text: `El producto '${values.name}' ha sido creado correctamente!`,
        icon: "success",
      });
      setValues({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        categories: [],
        labels: [],
      });
    }
  };

  return (
    <div className="relative h-full">
      <Header toggleSidebar={toggleSidebar} />
      <main className="relative bg-slate-100">
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">Crear Producto</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit);
            }}
            className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md"
          >
            {/* Área de arrastrar y soltar imagen */}
            <div
              className="border-dashed border-2 border-gray-400 p-4 rounded-lg text-center cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg"
                  onError={(e) => (e.currentTarget.src = image)}
                />
              ) : (
                <p className="text-gray-500">
                  Arrastra y suelta una imagen aquí o haz clic para seleccionar
                </p>
              )}
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="block bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer"
              >
                Seleccionar imagen
              </label>
            </div>

            {/* Nombre */}
            <div>
              <label className="block">Nombre</label>
              <input
                type="text"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full p-2 border rounded"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="block">Descripción</label>
              <textarea
                value={values.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full p-2 border rounded"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Precio y Cantidad en una línea */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block">Precio</label>
                <input
                  type="number"
                  value={values.price}
                  onChange={(e) =>
                    handleChange("price", Number(e.target.value))
                  }
                  className="w-full p-2 border rounded"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block">Cantidad</label>
                <input
                  type="number"
                  value={values.quantity}
                  onChange={(e) =>
                    handleChange("quantity", Number(e.target.value))
                  }
                  className="w-full p-2 border rounded"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">{errors.quantity}</p>
                )}
              </div>
            </div>

            {/* Categorías y Labels en la misma línea */}
            <div className="flex justify-around gap-2">
              <div
                className="border border-black p-2 rounded-md"
                style={{ width: "400px" }}
              >
                <label className="block text-sm font-semibold">
                  Categorías
                </label>
                <DynamicSelectGroup
                  options={categoriesData || []}
                  selectedOptions={values.categories}
                  onSelect={(selected) => handleChange("categories", selected)}
                />
              </div>

              <div
                className="border border-black p-2 rounded-md"
                style={{ width: "400px" }}
              >
                <label className="block text-sm font-semibold">Labels</label>
                <DynamicSelectGroup
                  options={labelsData || []}
                  selectedOptions={values.labels}
                  onSelect={(selected) => handleChange("labels", selected)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Crear Producto
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
