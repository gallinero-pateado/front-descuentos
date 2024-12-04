import React, { useState, useEffect } from 'react';

function SearchComponent({ products, setFilteredProducts, categoryFilter, typeFilter, priceRange, theme }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const sanitizedQuery = query.replace(/[^a-zA-Z0-9\s]/g, '').trim().toLowerCase();

      // Filtrar por búsqueda y respetar los filtros aplicados
      let filtered = products;

      // Filtrar por categoría
      if (categoryFilter) {
        filtered = filtered.filter(product => product.category === categoryFilter);
      }

      // Filtrar por tipo
      if (typeFilter) {
        filtered = filtered.filter(product => product.type === typeFilter);
      }

      // Filtrar por rango de precios
      filtered = filtered.filter(product => {
        if (product.price === 'Cupón') return true;
        const price = parseInt(product.price.replace(/[^0-9]/g, ''));
        return price >= priceRange.min && price <= priceRange.max;
      });

      // Filtrar por búsqueda
      if (sanitizedQuery.length >= 3) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(sanitizedQuery) ||
          product.description.toLowerCase().includes(sanitizedQuery)
        );
      }

      setFilteredProducts(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, products, categoryFilter, typeFilter, priceRange, setFilteredProducts]);

  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      maxLength={50}
      className={`p-2 w-60 border rounded text-center ${
        theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-600'
      }`}
    />
  );
}

export default SearchComponent;