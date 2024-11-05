import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product, toggleLike, theme }) => {
    const [showConditions, setShowConditions] = useState(false); // Estado para mostrar u ocultar condiciones

    const toggleConditions = () => {
        setShowConditions(!showConditions);
    };

    return (
        <div className={`p-2 px-4 rounded shadow-sm ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            {/* Renderiza la imagen del producto */}
            {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <p>Imagen no disponible</p>
                </div>
            )}

            {/* Nombre del producto */}
            <h2 className="text-lg font-semibold my-1">{product.name ? product.name : "Nombre no disponible"}</h2>

            {/* Descripción del producto */}
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{product.description ? product.description : "Descripción no disponible"}</p>

            {/* Precio anterior y precio con descuento */}
            <p className={`text-sm line-through ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{product.previous_price}</p> {/* Precio anterior */}
            <p className="text-green-600 font-semibold text-lg">{product.price}</p> {/* Precio con descuento */}

            {/* Botón para mostrar/ocultar condiciones */}
            <button
                onClick={toggleConditions}
                className={`px-3 py-1 mt-2 rounded ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-[#0092BC] text-white'} hover:bg-[#A3D9D3] hover:text-[#0092BC] transition duration-300`}
            >
                {showConditions ? 'Ocultar condiciones' : 'Ver condiciones'}
            </button>

            {/* Condiciones del producto */}
            <div className={`mt-2 overflow-hidden transition-all duration-500 ${showConditions ? 'max-h-40' : 'max-h-0'}`}>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                    {product.conditions ? product.conditions : "No hay condiciones disponibles"}
                </p>
            </div>

            {/* Botón para dar 'like' */}
            <button onClick={() => toggleLike(product.id)} className="mt-2">
                <Heart size={18} color={product.liked ? 'red' : theme === 'dark' ? 'white' : 'black'} />
            </button>
        </div>
    );
};

export default ProductCard;