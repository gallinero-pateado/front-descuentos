import React from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product, toggleLike, theme }) => {
  const hasNameOrDescription = product.name || product.description;

  return (
    <div
      className={`relative p-2 px-4 rounded shadow-sm flex flex-col transition-transform duration-300 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      {/* Imagen del producto */}
      <div
        className={`relative w-full h-96 rounded ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
        }`} // Cambia el fondo dependiendo del tema
        style={{
          backgroundImage: product.image ? `url(${product.image})` : 'none',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {!product.image && (
          <div className="flex items-center justify-center h-full">
            <p>Imagen no disponible</p>
          </div>
        )}
      </div>

      {/* Mostrar nombre y descripción solo si están disponibles */}
      {hasNameOrDescription && (
        <>
          <h2 className="text-lg font-semibold my-1">
            {product.name || 'Nombre no disponible'}
          </h2>
          <p
            className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {product.description || 'Más información abajo.'}
          </p>
        </>
      )}

      {/* Contenedor para precios */}
      <div className="mt-auto">
        <p
          className={`text-sm line-through ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          {product.previous_price}
        </p>
        <p className="text-green-600 font-semibold text-lg">{product.price}</p>
      </div>

      {/* Botón de "Más Información" */}
      <div className="flex justify-center mt-2">
        <a
          href={product.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-2 py-1 text-sm rounded ${
            theme === 'dark'
              ? 'bg-gray-600 text-white'
              : 'bg-[#0092BC] text-white hover:bg-[#A3D9D3] hover:text-[#0092BC]'
          } transition duration-300`}
        >
          Más Información
        </a>
      </div>

      {/* Línea separadora */}
      <hr className={`my-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} />

      {/* Logo del producto */}
      <div className="flex justify-center">
        {product.logo ? (
          <img src={product.logo} alt="Logo de la tienda" className="h-9 object-contain" />
        ) : (
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Logo no disponible
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
