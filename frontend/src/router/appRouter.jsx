import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/Login';
import Clientes from '../pages/admin/Clientes';
import ClienteNovo from '../pages/admin/NovoCliente';
import Tecnicos from '../pages/admin/Tecnicos';
import Chamados from '../pages/admin/Chamado';
import ChamadoDetalhe from '../pages/admin/ChamadoDetalhado';
import Layout from '../components/Layout';

const rotaProtegida = ({ children, adminOnly }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/app/chamados" />; // se nao for usuario de admin, retorna a rota de chamados
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/app"
        element={
          <rotaProtegida>
            <Layout />
          </rotaProtegida>
        }
      >
        <Route path="clientes" element={<rotaProtegida adminOnly><Clientes /></rotaProtegida>} />
        <Route path="clientes/novo" element={<rotaProtegida adminOnly><ClienteNovo /></rotaProtegida>} />
        <Route path="tecnicos" element={<rotaProtegida adminOnly><Tecnicos /></rotaProtegida>} />
        <Route path="chamados" element={<rotaProtegida><Chamados /></rotaProtegida>} />
        <Route path="chamado/:id" element={<rotaProtegida><ChamadoDetalhe /></rotaProtegida>} /> {/* Nova rota */}
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;