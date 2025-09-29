import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import Chamados from "../pages/Chamados";
import Tecnicos from "../pages/Tecnicos";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<Login />} />

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
