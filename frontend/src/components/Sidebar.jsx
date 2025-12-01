// src/components/Sidebar.jsx
import { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Sidebar.css';
import { FiAlignJustify , FiLogOut, FiUser } from 'react-icons/fi';
import { LuMenu } from "react-icons/lu";

import EditOwnProfileDrawer from './EditOwnProfileDrawer.jsx';

const Sidebar = () => {
  const { cliente, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fecha o dropdown ao clicar fora
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="sidebar">

        {/* HEADER */}
        <div className="sidebar-header">
          <img className="sidebar-logo" src="/Vector.svg" alt="GetCall Logo" />
          <div className="sidebar-title">
            <h1>GetCall</h1>
            <span>
              {cliente?.role === 'admin' ? 'Admin' :
               cliente?.role === 'tecnico' ? 'Técnico' : 'Cliente'}
            </span>
          </div>
        </div>

        {/* MENU */}
        <nav className="sidebar-menu">
          {cliente?.role === 'tecnico' && (
            <NavLink to="tecnicos/chamados" className={({ isActive }) => isActive ? 'menu-btn active' : 'menu-btn'}>
              Chamados
            </NavLink>
          )}
          {cliente?.role === 'cliente' && (
            <NavLink to="chamados" className={({ isActive }) => isActive ? 'menu-btn active' : 'menu-btn'}>
              Meus Chamados
            </NavLink>
          )}
          {cliente?.role === 'admin' && (
            <>
              <NavLink to="chamados" className={({ isActive }) => isActive ? 'menu-btn active' : 'menu-btn'}>Chamados</NavLink>
              <NavLink to="tecnicos" className={({ isActive }) => isActive ? 'menu-btn active' : 'menu-btn'}>Técnicos</NavLink>
              <NavLink to="clientes" className={({ isActive }) => isActive ? 'menu-btn active' : 'menu-btn'}>Clientes</NavLink>
            </>
          )}
        </nav>

        {/* PERFIL DO USUÁRIO (no rodapé) */}
        <div className="sidebar-cliente" ref={dropdownRef}>
          <div className="cliente-avatar">
            {cliente?.email.charAt(0).toUpperCase()}
          </div>

          <div className="cliente-info">
            <p className="cliente-name">{cliente?.nome || cliente?.email}</p>
            <p className="cliente-email">
              {cliente?.role === 'admin' ? 'Administrador' :
               cliente?.role === 'tecnico' ? 'Técnico' : 'Cliente'}
            </p>
          </div>

          <button
            className="edit-profile-btn"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            <LuMenu  size={18} />
          </button>

          {/* DROPDOWN */}
          {dropdownOpen && (
            <div className="profile-dropdown-menu">
              <button
                className="dropdown-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setDrawerOpen(true);
                  setDropdownOpen(false);
                }}
              >
                <FiUser size={18} />
                Perfil
              </button>

              <button
                className="dropdown-item danger"
                onClick={(e) => {
                  e.stopPropagation();
                  logout();
                  navigate('/login');
                }}
              >
                <FiLogOut size={18} />
                Sair
              </button>
            </div>
          )}
        </div>

        {/* Botão antigo (escondido pelo CSS) */}
        <button onClick={logout} className="logout-btn">Sair</button>

      </div> {/* ← fecha a div.sidebar */}

      {/* MODAL DE EDIÇÃO */}
      <EditOwnProfileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        clienteLogado={cliente}
      />
    </>
  );
};

export default Sidebar;