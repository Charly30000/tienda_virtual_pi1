import { useTranslate } from "@/hooks/useTranslate";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import img from "@/assets/img/no-image.webp";
import { GenericResponse } from "@/services/GenericResponse";
import { API_CONFIG } from "@/config/ApiConfig";
import { useServices } from "@/hooks/useServices";
import { ProductService } from "@/services/Products/ProductService";
import { ShoppingCartService } from "@/services/ShoppingCart/ShoppingCartService";

interface CardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const Card: React.FC<CardProps> = ({ id, name, image, price, quantity }) => {
  const t = useTranslate();
  const [added, setAdded] = useState(false);

  const { callService, errors } = useServices<GenericResponse>();
  const shoppingCartService = new ShoppingCartService();

  const onAddProduct = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const data = await callService(shoppingCartService.addProduct(id));
    if (data && !data.error) {
      setAdded(true);
    }
  };

  return (
    <Link
      to={`product/${id}`}
      className="flex flex-1 items-center p-2 flex-col gap-5 shadow-lg rounded-lg bg-white "
    >
      <div className="rounded-lg">
        <img
          alt="No image"
          src={`${API_CONFIG.BASE_URL}${image}`}
          onError={(e) => (e.currentTarget.src = img)}
        />
      </div>

      <h3>{name}</h3>

      <p>${price.toLocaleString("en-US")}</p>

      <p>{quantity.toLocaleString("en-US")} en stock</p>

      <button
        type="button"
        disabled={added}
        className={`px-4 py-2 rounded-md text-white transition-colors w-full
    ${
      added ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
    }
  `}
        onClick={onAddProduct}
      >
        {added ? "Añadido!" : "Añadir al carrito"}
      </button>
    </Link>
  );
};

export default Card;
