import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css'; // Para cambiar el color de las flechitas
import ErrorMessage from './ErrorMessage';
import { v4 as uuidv4 } from 'uuid'; // Importar uuidv4 para generar claves únicas

// Componente de Carrusel de Productos
function ProductCarrusel({ products, theme }) {
  const [showError, setShowError] = useState(false); // Estado para controlar la visualización del mensaje de error

  // Configuración del carrusel utilizando react-slick
  const settings = {
    dots: true, // Mostrar puntos de navegación en la parte inferior
    infinite: true, // Carrusel en bucle infinito
    speed: 500, // Velocidad de transición entre slides
    slidesToShow: 3, // Número de productos visibles al mismo tiempo
    slidesToScroll: 1, // Número de productos que se desplazan por cada acción
    arrows: true, // Mostrar flechas de navegación
    responsive: [ // Configuración para pantallas más pequeñas
      {
        breakpoint: 1024, // Resolución máxima de 1024px
        settings: {
          slidesToShow: 2, // Mostrar 2 productos en pantallas medianas
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Resolución máxima de 768px
        settings: {
          slidesToShow: 1, // Mostrar 1 producto en pantallas pequeñas
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mx-auto my-8 px-2 w-full max-w-6xl">
      <h2 className={`text-3xl font-bold rubik mb-6 ${theme === 'dark' ? 'text-[#A3D9D3]' : 'text-[#0092BC]'}`}>Ofertas Destacadas</h2>

      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id ? product.id : uuidv4()} className="px-1"> {/* Usar product.id o generar uuid */}
            <div className={`p-3 rounded-lg shadow-lg max-w-sm mx-auto ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h3 className={`text-md font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>{product.description}</p>
                
                {/* Mostrar precios */}
                <p className={`text-sm line-through ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{product.previous_price}</p> {/* Precio anterior */}
                <p className="text-green-600 font-bold text-base my-1">{product.price}</p> {/* Precio con descuento */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductCarrusel;