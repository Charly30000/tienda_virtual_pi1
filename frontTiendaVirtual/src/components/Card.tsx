import { useTranslate } from "@/hooks/useTranslate";
import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const Card: React.FC<CardProps> = ({ name, image, price, quantity }) => {
  const t = useTranslate();

  return (
    <Link
      to="/product"
      className="flex flex-1 items-center p-2 flex-col gap-5 shadow-lg rounded-lg bg-white ">
      <div className=" rounded-lg">
        <img src={image} alt="no image" />
      </div>

      <h3>{name}</h3>

      <p>${price}</p>

      <p>{quantity} en stock</p>

      <button
        type="button"
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 w-full">
        {t("card", "add")}
      </button>
    </Link>
  );
};

export default Card;
