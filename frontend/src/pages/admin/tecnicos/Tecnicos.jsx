// pages/admin/tecnicos/Tecnicos.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import "../../../css/admin/tecnicos/Tecnicos.css";
import PageHeader from "../../../components/PageHeader.jsx";
import ActionButton from "../../../components/ActionButton.jsx";

const Tecnicos = () => {
  const navigate = useNavigate();
  const { cliente } = useContext(AuthContext);

  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Proteção: só admin
  if (cliente?.role !== "admin") {
    return <p style={{ color: "red", textAlign: "center" }}>Acesso negado.</p>;
  }

  useEffect(() => {
    const carregarTecnicos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado.");

        const res = await axios.get("http://localhost:5000/api/tecnicos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTecnicos(res.data);
        setErro("");
      } catch (err) {
        const msg = err.response?.data?.error || "Erro ao carregar técnicos.";
        setErro(msg);
      } finally {
        setLoading(false);
      }
    };

    carregarTecnicos();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/app/tecnicos/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`/app/tecnicos/editar/${id}`);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este técnico?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tecnicos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTecnicos(tecnicos.filter((t) => t.id !== id));
      alert("Técnico excluído com sucesso!");
    } catch (err) {
      alert("Erro ao excluir técnico.");
    }
  };

  // Função para formatar horários
  // Dentro do componente Tecnicos
const formatarHorarios = (horarioObj) => {
  if (!horarioObj || typeof horarioObj !== 'object') {
    return "—";
  }
  return Object.values(horarioObj)
    .flat()
    .sort()
    .join(" ") || "—";
};

  if (loading) return <div className="loading">Carregando técnicos...</div>;
  if (erro) return <p style={{ color: "red", textAlign: "center" }}>{erro}</p>;

  return (
    <div className="tecnicos-container">
      <PageHeader
        title="Técnicos"
        onNewClick={() => navigate("/app/tecnicos/novo")}
      />

      {tecnicos.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          Nenhum técnico cadastrado.
        </p>
      ) : (
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
            {tecnicos.map((tecnico) => (
              <tr
                key={tecnico.id}
                className="tecnico-row"
                onClick={() => handleRowClick(tecnico.id)}
              >
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
                <td>{formatarHorarios(tecnico.horarioDeAtendimento)}</td>
                <td className="acoes" onClick={(e) => e.stopPropagation()}>
                  <ActionButton
                    type="delete"
                    title="Excluir técnico"
                    onClick={() => handleDeleteClick(tecnico.id)}
                  />
                  <ActionButton
                    type="edit"
                    title="Editar técnico"
                    onClick={() => handleEditClick(tecnico.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tecnicos;