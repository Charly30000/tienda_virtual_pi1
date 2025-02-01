import { useTranslate } from "@/hooks/useTranslate";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const HistoricCard = ({ date, products }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const t = useTranslate();

  const totalAmount = products
    .reduce((sum, product) => sum + product.quantity * product.price, 0)
    .toFixed(2);

  return (
    <div className="w-100 flex flex-col gap-2">
      <div className="w-full flex flex-col gap-2 border p-3 rounded-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-center">
            {t("beforeCart", "date")}: {date}
          </h3>
          <h4 className="text-center">
            {t("beforeCart", "total")}: ${totalAmount}
          </h4>
        </div>
        {isExpanded && (
          <div className="mt-2 flex flex-1 flex-col gap-5">
            {products.map((product, index) => (
              <Link to="/product">
                <div key={index} className="flex items-center justify-between">
                  <img
                    src="src/assets/img/no-image.webp"
                    alt="No image"
                    className="h-[100px]"
                  />
                  <span> {product.name}</span>
                  <span>${product.price.toFixed(2)}</span>
                  <span>{product.quantity}</span>
                  <span>${(product.quantity * product.price).toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={toggleAccordion}
        type="button"
        className="py-2 px-2 bg-blue-500 w-100 rounded-lg text-white">
        {isExpanded ? "Contraer" : "Expandir"}
      </button>
    </div>
  );
};

export default HistoricCard;
