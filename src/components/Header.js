
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Cambia el estado del menú abierto/cerrado
  };

  return (
    <header className="bg-blue-600 text-white p-7">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-5xl font-bold italic"><a href="/">UTEMY</a></h1>
        
        {/* Botón de hamburguesa visible solo en pantallas pequeñas */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />} {/* Cambia el ícono según el estado */}
        </button>

        {/* Navegación oculta en móviles, visible en pantallas medianas en adelante */}
        <nav className={`flex-col md:flex-row md:flex ${isMenuOpen ? 'flex' : 'hidden'} md:items-center md:space-x-6 mt-4 md:mt-0`}>
          <a href="/" className="bg-blue-800 text-white px-4 py-2 rounded font-bold italic text-lg hover:bg-sky-400 transition duration-300">
            Inicio
          </a>
          <a href="/" className="bg-blue-800 text-white px-4 py-2 rounded font-bold italic text-lg hover:bg-sky-400 transition duration-300">
            Nosotros
          </a>
          <a href="/" className="bg-blue-800 text-white px-4 py-2 rounded font-bold italic text-lg hover:bg-sky-400 transition duration-300">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
