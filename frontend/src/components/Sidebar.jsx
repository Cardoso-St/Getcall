import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DropdownMenu from './DropdownMenu';
import '../css/Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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
        <NavLink
          to="chamado/novo"
          className={({ isActive }) => (isActive ? 'menu-btn active' : 'menu-btn')}
        >
          📋 Criar novo chamado +
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

      <div
        className="sidebar-user"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="user-avatar">{user?.email.charAt(3)}</div>
        <div className="user-info">
          <p className="user-name">{user?.email}</p>
          <p className="user-email">{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
        </div>
        <DropdownMenu onLogout={logout} isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Sidebar;