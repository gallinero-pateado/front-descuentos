import React from 'react';
import Ubicacion from './Ubicacion'; // Importamos el botón de ubicación

function FilterBar({ handleCategoryFilter, handlePriceSort, handleTypeFilter, theme }) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 my-4">
      {/* Filtro por categorías */}
      <select
        onChange={handleCategoryFilter}
        className={`p-2 border rounded w-36 h-10 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
      >
        <option value="">Marca</option>
        <option value="Burger King">Burger King</option>
        <option value="Wendys">Wendys</option>
        <option value="Oxxo">Oxxo</option>
      </select>

      {/* Filtro por precio */}
      <select
        onChange={handlePriceSort}
        className={`p-2 border rounded w-42 h-10 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
      >
        <option value="">Ordenar por Precio</option>
        <option value="low-high">Menor a Mayor</option>
        <option value="high-low">Mayor a Menor</option>
      </select>

      {/* Filtro por tipo */}
      <select
        onChange={handleTypeFilter}
        className={`p-2 border rounded w-36 h-10 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
      >
        <option value="">Tipo</option>
        <option value="producto">Producto</option>
        <option value="Cupon">Cupón</option>
      </select>

      {/* Botón para ingresar ubicación 
      <div className="w-full sm:w-auto flex justify-center">
        <Ubicacion />
        */}
    </div>
  );
}

export default FilterBar;