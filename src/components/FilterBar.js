import React from 'react';
import Ubicacion from './Ubicacion'; // Importamos el botón de ubicación

function FilterBar({ handleCategoryFilter, handlePriceSort }) {
  return (
    <div className="flex justify-center items-center space-x-4 my-4">
      {/* Filtro por categorías */}
      <select onChange={handleCategoryFilter} className="p-2 border rounded w-48 h-10">
        <option value="">Marca</option>
        <option value="burgerking">Burger King</option>
        <option value="wendys">Wendys</option>

      </select>
      
      {/* Filtro por precio */}
      <select onChange={handlePriceSort} className="p-2 border rounded w-48 h-10">
        <option value="">Ordenar por Precio</option>
        <option value="low-high">Menor a Mayor</option>
        <option value="high-low">Mayor a Menor</option>
      </select>

      {/* Botón para ingresar ubicación */}
      <Ubicacion />
    </div>
  );
}

export default FilterBar;
