import React from "react";

interface CartProductProps {
  id: number; // If unused, this can be removed
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const CartProduct: React.FC<CartProductProps> = ({
  image,
  name,
  price,
  quantity,
}) => {
  const subtotal = quantity * price;

  return (
    <div className="flex items-center border p-3 rounded-sm justify-end gap-3">
      <img src={image} alt={name} className="h-40" />

      <h3 className="w-2/6">{name}</h3>

      <p className="w-1/6">${price.toFixed(2)}</p>

      
      <p className="w-1/6">{quantity}</p>

      <h4 className="w-1/6">${subtotal.toFixed(2)}</h4>

      <button
        type="button"
        className="p-3 bg-red-700 rounded-lg text-white"
        aria-label={`Eliminar ${name}`}
      >
        Eliminar
      </button>
    </div>
  );
};

export default CartProduct;
