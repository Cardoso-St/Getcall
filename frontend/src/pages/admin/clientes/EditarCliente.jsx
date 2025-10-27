import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import "../../../css/admin/clientes/NovoCliente.css";

const EditarCliente = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { cliente } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    role: "cliente",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cliente?.role !== "admin") return;
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/clientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFormData({
          nome: res.data.nome || "",
          email: res.data.email || "",
          senha: "",
          role: res.data.role || "cliente",
        });
      })
      .catch((err) => {
        setMessage(err.response?.data?.error || "Erro ao carregar cliente.");
      });
  }, [id, cliente]);

  if (cliente?.role !== "admin") return <p style={{ color: "red" }}>Acesso negado.</p>;
  if (message.includes("Erro ao carregar")) return <p style={{ color: "red" }}>{message}</p>;

  const handleCancel = () => navigate(-1);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const updateData = { nome: formData.nome, email: formData.email, role: formData.role };
      if (formData.senha) updateData.senha = formData.senha;

      await axios.put(
        `http://localhost:5000/api/clientes/editar/${id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Cliente atualizado com sucesso!");
      setTimeout(() => navigate("/app/clientes"), 1200);
    } catch (err) {
      setMessage(err.response?.data?.error || "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <main className="cliente-novo-container">
      <button className="voltarBotaoTeste" onClick={handleCancel}>← Voltar</button>
      <h2 className="titulo">Perfil do cliente, {state?.nome || formData.nome || "Sem nome"}</h2>
      <div className="cliente-form-card">
        <form className="cliente-form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input id="nome" type="text" placeholder="Nome completo" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="exemplo@mail.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha (opcional)</label>
            <input id="senha" type="password" placeholder="Nova senha" value={formData.senha} onChange={handleChange} minLength="6" />
            <small>Mínimo de 6 dígitos</small>
          </div>
          <div className="form-group">
            <label htmlFor="role">Função</label>
            <select id="role" value={formData.role} onChange={handleChange}>
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={handleCancel} disabled={loading}>Cancelar</button>
            <button type="submit" className="btn-salvar" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</button>
          </div>
        </form>
        {message && (
          <p style={{ marginTop: "12px", textAlign: "center", color: message.includes("sucesso") ? "green" : "red", fontWeight: "500" }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
};

export default EditarCliente;