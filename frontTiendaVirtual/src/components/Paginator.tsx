import React from "react";

interface PaginatorProps {
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

export const Paginator: React.FC<PaginatorProps> = ({
  totalPages,
  currentPage,
  onChangePage,
}) => {
  // Función para generar las páginas visibles (máximo 5)
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* Botón "Anterior" */}
      <button
        className={`px-4 py-2 rounded-md ${
          currentPage > 1
            ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
      >
        &laquo;
      </button>

      {/* Primer número si está oculto */}
      {visiblePages[0] > 1 && (
        <>
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            onClick={() => onChangePage(1)}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Números visibles */}
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-md ${
            currentPage === page
              ? "bg-blue-500 text-white font-bold"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => currentPage !== page && onChangePage(page)}
        >
          {page}
        </button>
      ))}

      {/* Último número si está oculto */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            onClick={() => onChangePage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Botón "Siguiente" */}
      <button
        className={`px-4 py-2 rounded-md ${
          currentPage < totalPages
            ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
      >
        &raquo;
      </button>
    </div>
  );
};
