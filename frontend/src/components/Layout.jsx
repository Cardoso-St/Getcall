import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../css/StylePrincipal.css";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;