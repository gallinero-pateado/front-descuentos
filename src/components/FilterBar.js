import React, { useState } from "react";
import ReactModal from "react-modal";
import Ubicacion from "./Ubicacion";

ReactModal.setAppElement("#root"); // Necesario para accesibilidad

function FilterBar({ handleCategoryFilter, handlePriceSort, handleTypeFilter, theme }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 my-4">
      {/* Filtro por categorías */}
      <select
        onChange={handleCategoryFilter}
        className={`p-2 border rounded w-36 h-10 ${
          theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
        }`}
      >
        <option value="">Marca</option>
        <option value="Burger King">Burger King</option>
        <option value="Wendys">Wendys</option>
        <option value="Oxxo">Oxxo</option>
      </select>

      {/* Filtro por precio */}
      <select
        onChange={handlePriceSort}
        className={`p-2 border rounded w-42 h-10 ${
          theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
        }`}
      >
        <option value="">Ordenar por Precio</option>
        <option value="low-high">Menor a Mayor</option>
        <option value="high-low">Mayor a Menor</option>
      </select>

      {/* Filtro por tipo */}
      <select
        onChange={handleTypeFilter}
        className={`p-2 border rounded w-36 h-10 ${
          theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
        }`}
      >
        <option value="">Tipo</option>
        <option value="producto">Producto</option>
        <option value="Cupon">Cupón</option>
      </select>

      {/* Botón para abrir el modal del mapa */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={`p-2 rounded text-sm transition duration-300 ${
          theme === "dark"
            ? "bg-gray-600 text-white hover:bg-gray-500"
            : "bg-[#0092BC] text-white hover:bg-[#A3D9D3] hover:text-[#0092BC]"
        }`}
      >
        Mostrar Ubicaciones
      </button>

      {/* Modal para el mapa */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className={`w-11/12 max-w-4xl rounded-lg shadow-lg p-4 mx-auto my-auto flex flex-col z-50 transition duration-300 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
      >
        {/* Encabezado del modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Mapa de Ubicaciones</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className={`font-bold px-2 py-1 rounded transition duration-300 ${
              theme === "dark"
                ? "bg-gray-600 text-white hover:bg-gray-500"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            X
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="flex-1">
          <div className="w-full h-auto">
            <div className="aspect-w-16 aspect-h-9">
              <Ubicacion theme={theme} />
            </div>
          </div>
        </div>
      </ReactModal>

    </div>
  );
}

export default FilterBar;
