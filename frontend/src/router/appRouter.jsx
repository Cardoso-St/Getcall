import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import Chamados from "../pages/admin/Chamado";
import Tecnicos from "../pages/admin/Tecnicos";
import Cadastro from "../pages/Cadastro";
import ChamadoDetalhado from "../pages/admin/ChamadoDetalhado";
import Clientes from "../pages/admin/Clientes"
import ClienteNovo from "../pages/admin/NovoCliente";
import ChamadoEditar from "../pages/admin/ChamadoEditar"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas privadas (com Sidebar/Layout) */}
        <Route path="/app" element={<Layout />}>
          <Route path="chamados" element={<Chamados />} />
          <Route path="chamado/:id" element={<ChamadoDetalhado />} />
          <Route path="chamado/editar/:id" element={<ChamadoEditar />} />
          <Route path="tecnicos" element={<Tecnicos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="/app/clientes/novo" element={<ClienteNovo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
