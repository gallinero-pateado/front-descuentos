import React from 'react';

function SearchComponent({ products, setFilteredProducts, theme }) {
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    
    // Filtrar por nombre o descripción del producto
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query) || // Busca el producto
      product.description.toLowerCase().includes(query) // Busca dentro de la descripción del producto
    );
    
    setFilteredProducts(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      onChange={handleSearch}
      maxLength={50} // Establecer un límite de caracteres
      className={`p-2 w-60 border rounded text-center ${
        theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-600'
      }`}
    />
  );
}

export default SearchComponent;
