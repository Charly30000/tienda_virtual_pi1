import { useTranslate } from "@/hooks/useTranslate";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GenericResponse } from "@/services/GenericResponse";

interface CardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const Card: React.FC<CardProps> = ({ id, name, image, price, quantity }) => {
  const t = useTranslate();

  const addProduct = async (productId: number): Promise<GenericResponse> => {
    try {
      const response = await axios.get(`/addProduct/${productId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const genericResponse: GenericResponse = error.response.data;
        throw genericResponse;
      } else {
        console.error("Unknown error:", error);
        throw {
          message: "An unexpected error occurred",
          status: 500,
          error: true,
        } as GenericResponse;
      }
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await addProduct(id);
      console.log(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link
      to="/product"
      className="flex flex-1 items-center p-2 flex-col gap-5 shadow-lg rounded-lg bg-white ">
      <div className="rounded-lg">
        <img src="src/assets/img/no-image.webp" alt="No image" />
      </div>

      <h3>{name}</h3>

      <p>${price}</p>

      <p>{quantity} en stock</p>

      <button
        type="button"
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 w-full"
        onClick={handleAddProduct}>
        {t("card", "add")}
      </button>
    </Link>
  );
};

export default Card;
