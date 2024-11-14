import React from 'react';
import { Sun, Moon } from 'lucide-react'; // Importamos los íconos de sol y luna

const DarkModeToggle = ({ theme, toggleTheme }) => {
  return (
    <div
      onClick={toggleTheme}
      className={`relative w-20 h-10 rounded-full p-1 cursor-pointer flex items-center justify-between transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'
      }`}
    >
      {/* Ícono de Sol para modo claro */}
      <Sun className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-yellow-500'} ml-1`} />

      {/* Elemento deslizante */}
      <div
        className={`absolute w-7 h-7 rounded-full shadow-md transform transition-transform duration-300 ${
          theme === 'dark' ? 'bg-yellow-500 translate-x-10' : 'bg-white translate-x-0'
        }`}
      />

      {/* Ícono de Luna para modo oscuro */}
      <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-500'} mr-1`} />
    </div>
  );
};

export default DarkModeToggle;
