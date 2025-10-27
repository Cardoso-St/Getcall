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
          <span>{cliente?.role === 'admin' ? 'Admin' : 'Cliente'}</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <NavLink
          to="chamados"
          className={({ isActive }) => (isActive ? 'menu-btn active' : 'menu-btn')}
        >
          📋 Chamados
        </NavLink>
        {cliente?.role === 'admin' && (
          <>
            <NavLink
              to="tecnicos"
              className={({ isActive }) => (isActive ? 'menu-btn active' : 'menu-btn')}
            >
              👨‍🔧 Técnicos
            </NavLink>
            <NavLink
              to="clientes"
              className={({ isActive }) => (isActive ? 'menu-btn active' : 'menu-btn')}
            >
              💼 Clientes
            </NavLink>
          </>
        )}
      </nav>

      <div className="sidebar-cliente">
        <div className="cliente-avatar">{cliente?.email.charAt(0)}</div>
        <div className="cliente-info">
          <p className="cliente-name">{cliente?.email}</p>
          <p className="cliente-email">{cliente?.role === 'admin' ? 'Administrador' : 'Cliente'}</p>
        </div>
        <button onClick={logout} className="logout-btn">Sair</button>
      </div>
    </div>
  );
};

export default Sidebar;