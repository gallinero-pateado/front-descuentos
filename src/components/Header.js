import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle'; // Importa el componente DarkModeToggle

const Header = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Cambia el estado del menú abierto/cerrado
  };

  return (
    <header className="bg-[#0092bc] text-white p-6">
      <div className="flex justify-between items-center mx-auto">
        <h1 className="text-5xl font-bold italic"><a href="/">ULINK</a></h1>

        
        {/* Botón de hamburguesa visible solo en pantallas pequeñas */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />} {/* Cambia el ícono según el estado */}
        </button>

        {/* Navegación oculta en móviles, visible en pantallas medianas en adelante */}
        <nav className={`flex-col md:flex-row md:flex ${isMenuOpen ? 'flex' : 'hidden'} md:items-center md:space-x-6 mt-4 md:mt-0`}>
        <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
          <a href="/" className="bg-[#A3D9D3] text-[#0092BC] px-8 py-3 rounded mr-5 font-bold italic text-lg hover:bg-[#0092BC] hover:text-white
            transition duration-300">
            Volver
          </a>

          
        </nav>


      </div>
    </header>
  );
};

export default Header;