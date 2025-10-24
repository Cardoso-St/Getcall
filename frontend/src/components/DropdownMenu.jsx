import React, { useState } from 'react';
import '../css/DropdownMenu.css';

const DropdownMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleProfile = () => {
    // Lógica para "Perfil" (pode ser expandida, ex.: navegar para uma página de perfil)
    console.log('Navegando para página de perfil');
    setIsOpen(false); // Fecha o dropdown após a ação
  };

  return (
    <div className="dropdown-container" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="dropdown-trigger">
        {/* Placeholder para o trigger, pode ser um ícone ou texto */}
        <span>▼</span>
      </div>
      {isOpen && (
        <div className="dropdown-menu" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
          <button className="menu-item" onClick={handleProfile}>
            Perfil
          </button>
          <button className="menu-item logout" onClick={() => {
            onLogout();
            setIsOpen(false); // Fecha o dropdown após logout
          }}>
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;