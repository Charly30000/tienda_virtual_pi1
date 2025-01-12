import React from "react";

const AdminCartProduct = () => {
  const product = {
    name: "Playstation 5",
    price: 500, // Price from database in the future
  };

  return (
    <div className="flex mt-5 items-center border p-3 rounded-sm justify-between gap-3">
      <div className="w-3/4 flex items-center">
        <div className="w-1/6 bg-black h-14"></div>

        <h3 className=" px-10">{product.name}</h3>

        <p>${product.price}</p>
      </div>

      <div className="flex w-1/4 items-center justify-between">
        <label htmlFor="isBlocked" className="flex gap-3">
          Esta blockeado ?
          <input type="checkbox" name="isBlocked" id="isBlocked" />
        </label>

        <button
          type="button"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100">
          Eliminar producto
        </button>
      </div>
    </div>
  );
};

export default AdminCartProduct;
