import { API_CONFIG } from "@/config/ApiConfig";
import React from "react";
import img from "@/assets/img/no-image.webp";

interface CartProductProps {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  totalAvailable: number;
  productBlocked: boolean;
  onChangeQuantity: (id: number, quantity: number) => void;
  onDeleteItem: (id: number) => void;
}

export const Row: React.FC<CartProductProps> = ({
  id,
  image,
  name,
  price,
  quantity,
  totalAvailable,
  productBlocked,
  onChangeQuantity,
  onDeleteItem,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <img
          src={`${API_CONFIG.BASE_URL}${image}`}
          className="w-16 md:w-32 max-w-full max-h-full"
          alt={image}
          onError={(e) => (e.currentTarget.src = img)}
        />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {name}
        {"\n"}
        {productBlocked && (
          <>
            <br />
            <span className="text-xs text-red-500 dark:text-red-400">
              El producto está bloqueado y no puede seleccionarse
            </span>
          </>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <select
            className={`block p-2 mb-6 text-sm text-gray-900 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    ${
      quantity > totalAvailable
        ? "border-red-500 bg-red-100 dark:border-red-500 dark:bg-red-900"
        : "border-gray-300"
    }
  `}
            value={quantity}
            onChange={(e) => onChangeQuantity(id, parseInt(e.target.value, 10))}
            disabled={productBlocked}
          >
            {Array.from({ length: totalAvailable }).map((_, idx) => (
              <option key={idx} value={idx + 1}>
                {idx + 1}
              </option>
            ))}

            {quantity > totalAvailable && (
              <option key="extra" value={quantity}>
                {quantity}
              </option>
            )}
          </select>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        $
        {(quantity * price).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="px-6 py-4">
        <button
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
          onClick={() => onDeleteItem(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};
