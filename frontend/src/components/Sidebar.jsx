import { NavLink } from "react-router-dom";
import "../css/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo / Topo */}
      <div className="sidebar-header">
        <img className="sidebar-logo" src="/Vector.svg" alt="GetCall Logo" />
        <div className="sidebar-title">
          <h1>GetCall</h1>
          <span>Admin</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        <NavLink
          to="chamados" // RELATIVO ao /app
          className={({ isActive }) =>
            isActive ? "menu-btn active" : "menu-btn"
          }
        >
          📋 Meus chamados
        </NavLink>

        <NavLink
          to="tecnicos" // RELATIVO ao /app
          className={({ isActive }) =>
            isActive ? "menu-btn active" : "menu-btn"
          }
        >
          👨‍🔧 Técnicos
        </NavLink>

        <NavLink
          to="clientes" // RELATIVO ao /app
          className={({ isActive }) =>
            isActive ? "menu-btn active" : "menu-btn"
          }
        >
          💼 Clientes
        </NavLink>
      </nav>

      {/* Usuário */}
      <div className="sidebar-user">
        <div className="user-avatar">UT</div>
        <div className="user-info">
          <p className="user-name">Usuário Técnico</p>
          <p className="user-email">user.tech@test.com</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
