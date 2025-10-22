import { BrowserRouter, Routes, Route } from "react-router-dom";

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

// Técnicos
import Tecnicos from "../pages/admin/tecnicos/Tecnicos";
import TecnicoDetalhado from "../pages/admin/tecnicos/TecnicoDetalhado";
import TecnicoEditar from "../pages/admin/tecnicos/TecnicosEditar";
import TecnicoNovo from "../pages/admin/tecnicos/TecnicoNovo";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas privadas (com Sidebar/Layout) */}
        <Route path="/app" element={<Layout />}>
        
          {/* CHAMADOS */}
          <Route path="chamados" element={<Chamados />} />
          <Route path="chamado/novo" element={<ChamadoNovo />} />{" "}
          <Route path="chamado/editar/:id" element={<ChamadoEditar />} />
          <Route path="chamado/:id" element={<ChamadoDetalhado />} />{" "}

          {/* CLIENTES */}
          <Route path="clientes" element={<Clientes />} />
          <Route path="clientes/novo" element={<ClienteNovo />} />

          {/* TÉCNICOS */}
          <Route path="tecnicos" element={<Tecnicos />} />
          <Route path="tecnicos/:id" element={<TecnicoDetalhado />} />{" "}
          <Route path="tecnicos/editar/:id" element={<TecnicoEditar />} />{" "}
          <Route path="tecnicos/novo" element={<TecnicoNovo />} />{" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
