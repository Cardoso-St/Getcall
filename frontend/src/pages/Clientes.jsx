import React from 'react';
import '../css/Clientes.css'; // Crie esse arquivo para os estilos
import PageHeader from '../components/PageHeader';
import { useNavigate } from "react-router-dom";
const Clientes = () => {
  // Dados mockados baseados na imagem (substitua por dados reais de API)
  const todosClientes = [
    { id: 1, nome: 'Carlos Silva', email: 'carlos.silva@test.com' },
  ];
const navigate = useNavigate();
  return (
    <div className="clientes-container">
      {/* Cabeçalho */}
      <PageHeader title="Clientes" onNewClick={() => navigate("/app/clientes/novo")} />
      {/* Tabela principal */}
      <table className="clientes-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Disponibilidade</th>
          </tr>
        </thead>
        <tbody>
          {todosClientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>
                <span className="avatar">{cliente.nome.charAt(0)}</span> {cliente.nome}
              </td>
              <td>{cliente.email}</td>
              <td>{cliente.disponibilidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;