import React, { useState, useEffect } from 'react';

function SearchComponent({ products, setFilteredProducts, theme }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const sanitizedQuery = query.replace(/[^a-zA-Z0-9\s]/g, '').trim().toLowerCase();

      if (sanitizedQuery.length < 3) {
        setFilteredProducts(products);
        return;
      }

      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(sanitizedQuery) || 
        product.description.toLowerCase().includes(sanitizedQuery)
      );

      setFilteredProducts(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, products, setFilteredProducts]);

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
