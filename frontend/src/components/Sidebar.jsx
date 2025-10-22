import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img className="sidebar-logo" src="/Vector.svg" alt="GetCall Logo" />
        <div className="sidebar-title">
          <h1>GetCall</h1>
          <span>{user?.role === 'admin' ? 'Admin' : 'Usuário'}</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <NavLink
          to="chamados"
          className={({ isActive }) => (isActive ? 'menu-btn active' : 'menu-btn')}
        >
          📋 Chamados
        </NavLink>
        {user?.role === 'admin' && (
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

      <div className="sidebar-user">
        <div className="user-avatar">{user?.email.charAt(0)}</div>
        <div className="user-info">
          <p className="user-name">{user?.email}</p>
          <p className="user-email">{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
        </div>
        <button onClick={logout} className="logout-btn">Sair</button>
      </div>
    </div>
  );
};

export default Sidebar;