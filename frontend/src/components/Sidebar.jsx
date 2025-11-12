// src/components/Sidebar.jsx
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Sidebar.css';

const Sidebar = () => {
  const { cliente, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="sidebar">
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

      <nav className="sidebar-menu">
        {/* TÉCNICO */}
        {cliente?.role === 'tecnico' && (
       <NavLink
          to="tecnicos/chamados"  // ← MUDOU AQUI
          className={({ isActive }) => (isActive ? 'menu-btn active' : 'menu-btn')}
           >
       Chamados
      </NavLink>
        )}

        {/* CLIENTE */}
        {cliente?.role === 'cliente' && (
          <NavLink
            to="chamados"
            className={({ isActive }) => (isActive ? 'menu-btn active' : 'menu-btn')}
          >
           Meus Chamados
          </NavLink>
        )}

        {/* ADMIN */}
        {cliente?.role === 'admin' && (
          <>
            <NavLink
              to="chamados"
              className={({ isActive }) => (isActive ? 'menu-btn active' : 'menu-btn')}
            >
              Chamados
            </NavLink>
            <NavLink
              to="tecnicos"
              className={({ isActive }) => (isActive ? 'menu-btn active' : 'menu-btn')}
            >
              Técnicos
            </NavLink>
            <NavLink
              to="clientes"
              className={({ isActive }) => (isActive ? 'menu-btn active' : 'menu-btn')}
            >
              Clientes
            </NavLink>
          </>
        )}
      </nav>

      <div className="sidebar-cliente">
        <div className="cliente-avatar">{cliente?.email.charAt(0).toUpperCase()}</div>
        <div className="cliente-info">
          <p className="cliente-name">{cliente?.nome || cliente?.email}</p>
          <p className="cliente-email">
            {cliente?.role === 'admin' ? 'Administrador' : 
             cliente?.role === 'tecnico' ? 'Técnico' : 'Cliente'}
          </p>
        </div>
      </div>

      <button onClick={logout} className="logout-btn">Sair</button>
    </div>
  );
};

export default Sidebar;