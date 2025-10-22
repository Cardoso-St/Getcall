import React, { useState, useEffect, useContext } from "react";
import "../../../css/admin/clientes/Clientes.css";
import PageHeader from "../../../components/PageHeader.jsx";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/ActionButton.jsx";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext"; // ajuste o caminho se necessário

const Clientes = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carregar clientes do backend
  useEffect(() => {
    if (!user || user?.role !== "admin") return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token não encontrado. Faça login novamente.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/users/list-users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setClientes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar clientes:", err);
        setError("Erro ao carregar clientes.");
        setLoading(false);
      });
  }, [user]);

  // Proteções
  if (!user || user?.role !== "admin") return <p>Acesso negado.</p>;
  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Funções de ação (mantidas do código original)
  const handleEditClick = (id) => {
    navigate(`/app/clientes/editar/${id}`);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      const token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setClientes(clientes.filter((c) => c.id !== id));
        })
        .catch((err) => {
          alert("Erro ao excluir cliente.");
          console.error(err);
        });
    }
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
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>
                <span className="avatar">
                  {cliente.nome
                    ? cliente.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                    : cliente.email.charAt(0).toUpperCase()}
                </span>
                {cliente.nome || "Nome não informado"}
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