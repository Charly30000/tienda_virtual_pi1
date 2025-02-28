import React from "react";

interface Props {
  total: number | string;
  buttonEnabled: boolean;
  onClick: () => void;
}

export const Card = ({ total, buttonEnabled, onClick }: Props) => {
  return (
    <div className="w-1/4">
      <div
        id="myCard"
        className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total del carrito
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Total: ${total}
        </p>
        <button
          className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg 
    ${
      !buttonEnabled
        ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        : "bg-gray-400 cursor-not-allowed opacity-50 dark:bg-gray-600"
    }`}
          onClick={onClick}
          disabled={buttonEnabled}
        >
          Comprar
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
