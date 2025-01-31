import React from "react";
import { API_CONFIG } from "@/config/ApiConfig";
import image from "@/assets/img/no-image.webp";

interface Props {
  id: number;
  image: string;
  name: string;
  price: number | string;
  quantity: number;
  totalAvailable: number;
  productBlocked: boolean;
  onBlockProduct: (id: number) => void;
}

export const Card = (props: Props) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="p-8 rounded-t-lg h-48 w-full object-contain"
          src={`${API_CONFIG.BASE_URL}${props.image}`}
          alt="product image"
          onError={(e) => (e.currentTarget.src = image)}
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.name}
          </h5>
        </a>

        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Cantidad:</strong> {props.quantity}
          </p>
          <p>
            <strong>Total disponibles:</strong> {props.totalAvailable}
          </p>
          <p>
            <strong>Vendidos:</strong> {props.quantity - props.totalAvailable}
          </p>
        </div>

        {props.productBlocked && (
          <p className="mt-1 text-xs text-red-500">
            Producto bloqueado, contacta con los administradores para poder
            desbloquearlo.
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${props.price}
          </span>
          <button
          onClick={e => props.onBlockProduct(props.id)} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700">
            Bloquear producto
          </button>
        </div>
      </div>
    </div>
  );
};
