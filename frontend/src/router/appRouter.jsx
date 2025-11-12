import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Autenticação
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Layout from "../components/Layout";

// Chamados
import Chamados from "../pages/admin/chamados/Chamado";
import ChamadoDetalhado from "../pages/admin/chamados/ChamadoDetalhado";
import ChamadoEditar from "../pages/admin/chamados/ChamadoEditar";
import ChamadoNovo from "../pages/admin/chamados/ChamadoNovo";

// Clientes
import Clientes from "../pages/admin/clientes/Clientes";
import ClienteNovo from "../pages/admin/clientes/NovoCliente";
import EditarCliente from "../pages/admin/clientes/EditarCliente";

// Técnicos
import Tecnicos from "../pages/admin/tecnicos/Tecnicos";
import TecnicoDetalhado from "../pages/admin/tecnicos/TecnicoDetalhado";
import TecnicoEditar from "../pages/admin/tecnicos/TecnicosEditar";
import TecnicoNovo from "../pages/admin/tecnicos/TecnicoNovo";


// 🧩 Componente de proteção de rota
const RotaProtegida = ({ children, adminOnly }) => {
  const { cliente, loading } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;
  if (!cliente) return <Navigate to="/login" />;

  // Admin só para role "admin"
  if (adminOnly && cliente.role !== "admin") {
    return <Navigate to="/app/chamados" />;
  }

  // Técnicos podem ver chamados
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rotas privadas (com Sidebar/Layout) */}
      <Route
        path="/app"
        element={
          <RotaProtegida>
            <Layout />
          </RotaProtegida>
        }
      >
        {/* CHAMADOS */}
        <Route
          path="chamados"
          element={
            <RotaProtegida>
              <Chamados />
            </RotaProtegida>
          }
        />
        <Route
          path="chamado/novo"
          element={
            <RotaProtegida>
              <ChamadoNovo />
            </RotaProtegida>
          }
        />
        <Route
          path="chamado/editar/:id"
          element={
            <RotaProtegida>
              <ChamadoEditar />
            </RotaProtegida>
          }
        />
        <Route
          path="chamado/:id"
          element={
            <RotaProtegida>
              <ChamadoDetalhado />
            </RotaProtegida>
          }
        />

        {/* CLIENTES */}
        <Route
          path="clientes"
          element={
            <RotaProtegida adminOnly>
              <Clientes />
            </RotaProtegida>
          }
        />
        <Route
          path="clientes/novo"
          element={
            <RotaProtegida adminOnly>
              <ClienteNovo />
            </RotaProtegida>
          }
        />
        <Route
          path="clientes/editar/:id"
          element={
            <RotaProtegida adminOnly>
              <EditarCliente />
            </RotaProtegida>
          }
        />

        {/* TÉCNICOS */}
        <Route
          path="tecnicos"
          element={
            <RotaProtegida adminOnly>
              <Tecnicos />
            </RotaProtegida>
          }
        />
        <Route
          path="tecnicos/:id"
          element={
            <RotaProtegida adminOnly>
              <TecnicoDetalhado />
            </RotaProtegida>
          }
        />
        <Route
          path="tecnicos/editar/:id"
          element={
            <RotaProtegida adminOnly>
              <TecnicoEditar />
            </RotaProtegida>
          }
        />
        <Route
          path="tecnicos/novo"
          element={
            <RotaProtegida adminOnly>
              <TecnicoNovo />
            </RotaProtegida>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
