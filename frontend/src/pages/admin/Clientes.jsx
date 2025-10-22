import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import PageHeader from '../../components/PageHeader.jsx';
import '../../css/admin/Clientes.css';

const Clientes = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') return;
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/users/list-users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setClientes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erro ao carregar clientes.');
        setLoading(false);
      });
  }, [user]);

  if (user?.role !== 'admin') return <p>Acesso negado.</p>;
  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="clientes-container">
      <PageHeader title="Clientes" onNewClick={() => navigate('/app/clientes/novo')} />
      <table className="clientes-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>
                <span className="avatar">{cliente.email.charAt(0)}</span> {cliente.email}
              </td>
              <td>{cliente.email}</td>
              <td>{cliente.role === 'admin' ? 'Administrador' : 'Usuário'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;