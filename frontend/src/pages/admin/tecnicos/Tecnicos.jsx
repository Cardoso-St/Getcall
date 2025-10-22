import React from "react";
import { useNavigate } from "react-router-dom"; // ADICIONADO
import "../../../css/admin/tecnicos/Tecnicos.css";
import PageHeader from "../../../components/PageHeader.jsx";
import ActionButton from "../../../components/ActionButton.jsx";

const Tecnicos = () => {
  const navigate = useNavigate(); // ADICIONADO

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

  // FUNÇÕES ADICIONADAS
  const handleEditClick = (id) => {
    navigate(`/app/tecnicos/editar/${id}`); // REDIRECIONA PARA EDITAR
  };

  const handleDeleteClick = (id) => {
    // Implementar lógica de delete
    console.log(`Deletar técnico ${id}`);
  };

  return (
    <div className="tecnicos-container">
      {/* Cabeçalho */}
      <PageHeader
        title="Técnicos"
        onNewClick={() => navigate("/app/tecnicos/novo")} // ADICIONADO: redireciona para novo
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
                {/* CORRIGIDO: usar técnico ao invés de cliente */}
                <ActionButton
                  type="delete"
                  title="Excluir técnico"
                  onClick={() => handleDeleteClick(tecnico.id)}
                />
                <ActionButton
                  type="edit"
                  title="Editar técnico"
                  onClick={() => handleEditClick(tecnico.id)} // CORRIGIDO
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