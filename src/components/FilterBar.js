import React from 'react';
import Ubicacion from './Ubicacion'; // Importamos el botón de ubicación

function FilterBar({ handleCategoryFilter, handlePriceSort, handleTypeFilter, theme }) {
  return (
    <div className="flex justify-center items-center space-x-4 my-4">
      {/* Filtro por categorías */}
      <select
        onChange={handleCategoryFilter}
        // Para el modo oscuro
        className={`p-2 border rounded w-48 h-10 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
      >
        <option value="">Marca</option>
        <option value="burgerking">Burger King</option>
        <option value="wendys">Wendys</option>
      </select>

      {/* Filtro por precio */}
      <select
        onChange={handlePriceSort}
        // Para el modo oscuro 
        className={`p-2 border rounded w-48 h-10 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
      >
        <option value="">Ordenar por Precio</option>
        <option value="low-high">Menor a Mayor</option>
        <option value="high-low">Mayor a Menor</option>
      </select>

      {/* Filtro por tipo */}
      <select
        onChange={handleTypeFilter}
        // Para modo oscuro
        className={`p-2 border rounded w-48 h-10 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
      >
        <option value="">Tipo</option>
        <option value="producto">Producto</option>
        <option value="cupon">Cupón</option>
      </select>

      {/* Botón para ingresar ubicación */}
      <Ubicacion />
    </div>
  );
}

export default FilterBar;
