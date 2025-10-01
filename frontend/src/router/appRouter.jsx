import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import Chamados from "../pages/Chamados";
import Tecnicos from "../pages/Tecnicos";
import Cadastro from "../pages/Cadastro";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro/>} /> {/* nova rota */}

        {/* Rotas privadas (com Sidebar) */}
        <Route path="/app" element={<Layout />}>
          <Route path="chamados" element={<Chamados />} />
          <Route path="tecnicos" element={<Tecnicos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
