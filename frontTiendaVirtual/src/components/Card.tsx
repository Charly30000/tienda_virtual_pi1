import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <Link to='/product' className="flex items-center p-2 flex-col gap-5 shadow-lg rounded-lg bg-white ">
      <div className="w-[300px] bg-black h-40  rounded-lg"></div>

      <h3>Play 1</h3>

      <p>$100</p>

      <p>5 en stock</p>

      <button
        type="button"
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100 w-full">
        Añadir
      </button>
    </Link>
  );
};

export default Card;
