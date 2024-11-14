import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product, toggleLike, theme }) => {
    const [showConditions, setShowConditions] = useState(false);

    const toggleConditions = () => {
        setShowConditions(!showConditions);
    };

    return (
        <div className={`relative p-2 px-4 rounded shadow-sm flex flex-col transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} ${showConditions ? 'transform scale-105 z-10' : ''}`}>
            {/* Imagen del producto */}
            {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <p>Imagen no disponible</p>
                </div>
            )}

            {/* Nombre del producto */}
            <h2 className="text-lg font-semibold my-1">{product.name || "Nombre no disponible"}</h2>

            {/* Descripción del producto */}
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{product.description || "Descripción no disponible"}</p>

            {/* Contenedor para precios */}
            <div className="mt-auto">
                <p className={`text-sm line-through ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{product.previous_price}</p>
                <p className="text-green-600 font-semibold text-lg">{product.price}</p>
            </div>

            {/* Botón para mostrar/ocultar condiciones */}
            <div className="flex justify-center mt-2">
                <button
                    onClick={toggleConditions}
                    className={`px-2 py-1 text-sm rounded ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-[#0092BC] text-white'} hover:bg-[#A3D9D3] hover:text-[#0092BC] transition duration-300`}
                >
                    {showConditions ? 'Ocultar condiciones' : 'Ver condiciones'}
                </button>
            </div>

            {/* Condiciones del producto (debajo del botón) */}
            <div className={`overflow-hidden transition-all duration-500 ${showConditions ? 'max-h-40 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                    {product.conditions || "No hay condiciones disponibles"}
                </p>
            </div>

            {/* Botón de 'like' */}
            <div className="flex justify-center mt-2">
                <button onClick={() => toggleLike(product.id)}>
                    <Heart size={18} color={product.liked ? 'red' : theme === 'dark' ? 'white' : 'black'} />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
