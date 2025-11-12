// src/routes/AppRoutes.jsx
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
import TecnicoChamados from "../pages/admin/tecnicos/TecnicoChamado";

// Componente de proteção de rota
const RotaProtegida = ({ children, adminOnly, role }) => {
  const { cliente, loading } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;
  if (!cliente) return <Navigate to="/login" replace />;

  if (role && cliente.role !== role) {
    return <Navigate to="/app/chamados" replace />;
  }

  if (adminOnly && cliente.role !== "admin") {
    return <Navigate to="/app/chamados" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* ==================== ROTAS PÚBLICAS ==================== */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      {/* ==================== ROTAS PRIVADAS COM LAYOUT ==================== */}
      <Route
        path="/app"
        element={
          <RotaProtegida>
            <Layout />
          </RotaProtegida>
        }
      >
        {/* RAIZ DO APP → VAI PRA TABELA (PADRÃO) */}
        <Route index element={<Navigate to="/app/chamados" replace />} />

        {/* TÉCNICO - CARDS */}
        <Route
          path="tecnicos/chamados"
          element={
            <RotaProtegida role="tecnico">
              <TecnicoChamados />
            </RotaProtegida>
          }
        />

        {/* ADMIN/CLIENTE - TABELA */}
        <Route
          path="chamados"
          element={
            <RotaProtegida >
              <Chamados />
            </RotaProtegida>
          }
        />

        {/* CHAMADOS - CRUD */}
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

        {/* CLIENTES - ADMIN ONLY */}
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

        {/* TÉCNICOS - ADMIN ONLY */}
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