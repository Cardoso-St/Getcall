import React from "react";
import "../../../css/admin/clientes/Clientes.css";
import PageHeader from "../../../components/PageHeader.jsx";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/ActionButton.jsx";

const Clientes = () => {
  const todosClientes = [
    { id: 1, nome: "André Costa", email: "andre.costa@client.com" },
    { id: 2, nome: "Julia Maria", email: "julia.maria@client.com" },
    { id: 3, nome: "Aline Souza", email: "aline.souza@client.com" },
    { id: 4, nome: "Carlos Silva", email: "carlos.silva@test.com" },
    { id: 5, nome: "Suzane Moura", email: "suzane.moura@client.com" },
  ];

  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/app/clientes/editar/${id}`);
  };

  const handleDeleteClick = (id) => {
    console.log(`Excluir cliente ${id}`);
    // aqui você pode chamar a API para deletar
  };

  return (
    <div className="clientes-container">
      <PageHeader
        title="Clientes"
        onNewClick={() => navigate("/app/clientes/novo")}
      />

      <table className="clientes-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th className="acoes-coluna">Ações</th>
          </tr>
        </thead>
        <tbody>
          {todosClientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>
                <span className="avatar">
                  {cliente.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </span>
                {cliente.nome}
              </td>
              <td>{cliente.email}</td>
              <td
                className="acoes"
                style={{
                  display: "flex",
                  gap: "6px",
                  justifyContent: "center",
                }}
              >
                <ActionButton
                  type="delete"
                  title="Excluir cliente"
                  onClick={() => handleDeleteClick(cliente.id)}
                />
                <ActionButton
                  type="edit"
                  title="Editar cliente"
                  onClick={() => handleEditClick(cliente.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
