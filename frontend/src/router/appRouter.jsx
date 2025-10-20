import { BrowserRouter, Routes, Route } from "react-router-dom";

//autenticação
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Layout from "../components/Layout";

//chamados
import Chamados from "../pages/admin/chamados/Chamado";
import ChamadoDetalhado from "../pages/admin/chamados/ChamadoDetalhado";
import ChamadoEditar from "../pages/admin/chamados/ChamadoEditar"

//clientes
import Clientes from "../pages/admin/clientes/Clientes"
import ClienteNovo from "../pages/admin/clientes/NovoCliente";

//tecnicos
import Tecnicos from "../pages/admin/tecnicos/Tecnicos";

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
