import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import Cookies from 'js-cookie';
import DarkModeToggle from './DarkModeToggle'; // Importa el componente DarkModeToggle

const Header = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Cambia el estado del menú abierto/cerrado
  };

  const handleLogout = () => {
    const cookieOptions = {
      path: '/', 
      secure: true, 
      sameSite: 'Strict', 
      domain: ".tssw.info" 
    };

    // Eliminar cookies relacionadas con la autenticación
    Cookies.remove('authToken', cookieOptions);
    Cookies.remove('uid', cookieOptions);

    console.log('Cookies eliminadas:', {
      authToken: Cookies.get('authToken'),
      uid: Cookies.get('uid')
    });

    // Redirigir al login
    window.location.href = 'https://ulink.tssw.info/';
  };

  // Cierra el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-[#0092BC] text-white p-6 relative z-20">
      <div className="flex justify-between items-center mx-auto">
        {/* Título */}
        <h1 className="text-5xl font-bold italic">ULINK</h1>

        {/* Contenedor para el botón y toggle */}
        <div className="flex items-center space-x-4">
          {/* Componente de modo oscuro */}
          <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Botón "Volver" para pantallas grandes */}
          <nav className="hidden md:flex items-center space-x-4">
            <a
              href="https://ulink.tssw.info/unificacion"
              className="bg-[#A3D9D3] text-[#0092BC] px-8 py-3 rounded font-bold italic text-lg hover:bg-[#0092BC] hover:text-white transition duration-300"
            >
              Volver
            </a>
            <button
              onClick={handleLogout}
              className="bg-[#A3D9D3] text-[#0092BC] px-8 py-3 rounded font-bold italic text-lg hover:bg-[#0092BC] hover:text-white transition duration-300"
            >
              Salir
            </button>
          </nav>

          {/* Botón de menú hamburguesa visible en pantallas pequeñas */}
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-full md:hidden ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-[#DAEDF2]'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={32} color={theme === 'dark' ? '#ffffff' : '#0092BC'} />
            ) : (
              <Menu size={32} color={theme === 'dark' ? '#ffffff' : '#0092BC'} />
            )}
          </button>
        </div>
      </div>

      {/* Menú desplegable en pantallas más pequeñas */}
      {isMenuOpen && (
        <nav
          ref={menuRef}
          className="fixed top-0 right-0 h-full w-64 bg-[#0092BC] text-white shadow-lg z-30 flex flex-col p-6 transition-transform duration-300 font-semibold"
        >
          <a
            href="https://ulink.tssw.info/unificacion"
            className="block py-4 px-2 rounded-md transition-colors duration-200 hover:bg-[#DAEDF2] hover:text-[#0092BC] active:bg-[#DAEDF2] active:text-[#0092BC] text-left"
          >
            Volver
          </a>
          <button
            onClick={handleLogout}
            className="block py-4 px-2 rounded-md transition-colors duration-200 hover:bg-[#DAEDF2] hover:text-[#0092BC] active:bg-[#DAEDF2] active:text-[#0092BC] text-left"
          >
            Salir
          </button>
          <ChevronRight
            onClick={toggleMenu}
            className="mt-auto self-end cursor-pointer hover:text-[#DAEDF2] transition duration-300"
            size={24}
            color="white"
          />
        </nav>
      )}
    </header>
  );
};

export default Header;
