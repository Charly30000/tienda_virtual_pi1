import React, { useState } from "react";

const CartProduct = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Playstation 5",
    price: 500, // Price from database in the future
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value === "" || parseInt(value) >= 0) {
      setQuantity(value);
    }
  };

  const handleBlur = () => {
    if (quantity === "" || isNaN(quantity) || quantity <= 0) {
      setQuantity(1); // Reset to 1 if invalid
    } else {
      setQuantity(parseInt(quantity));
    }
  };

  const subtotal = (quantity || 1) * product.price;

  return (
    <div className="flex items-center border p-3 rounded-sm justify-end gap-3">
      <div className="w-1/6 bg-black h-14"></div>

      <h3 className="w-2/6">{product.name}</h3>

      <p className="w-1/6">${product.price}</p>

      <input
        type="number"
        className="w-1/6 border-none bg-transparent"
        value={quantity}
        onChange={handleQuantityChange}
        onBlur={handleBlur}
      />

      <h4 className="w-1/6">${subtotal.toFixed(2)}</h4>
    </div>
  );
};

export default CartProduct;
