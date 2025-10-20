import React from "react";
import "../../css/admin/Tecnicos.css";
import PageHeader from "../../components/PageHeader.jsx";
import ActionButton from "../../components/ActionButton";

const Tecnicos = () => {
  // Dados mockados (substitua por dados reais de API)
  const todosTecnicos = [
    {
      id: 1,
      nome: "Carlos Silva",
      email: "carlos.silva@test.com",
      disponibilidade: "08:00 09:00 10:00 11:00 -4",
    },
    {
      id: 2,
      nome: "Aline Souza",
      email: "aline.souza@tecnico.com",
      disponibilidade: "09:00 10:00 14:00 15:00 -4",
    },
    {
      id: 3,
      nome: "Julia Maria",
      email: "julia.maria@tecnico.com",
      disponibilidade: "08:00 09:00 10:00 -4",
    },
  ];

  return (
    <div className="tecnicos-container">
      {/* Cabeçalho */}
      <PageHeader
        title="Técnicos"
        onNewClick={() =>
          alert("BOTÃO PARA ADICIONAR TÉCNICO FUNCIONANDO PAPAI")
        }
      />

      {/* Tabela principal */}
      <table className="tecnicos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Disponibilidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {todosTecnicos.map((tecnico) => (
            <tr key={tecnico.id}>
              <td>
                <span className="avatar">
                  {tecnico.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </span>{" "}
                {tecnico.nome}
              </td>
              <td>{tecnico.email}</td>
              <td>{tecnico.disponibilidade}</td>
              <td className="acoes">
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

export default Tecnicos;
