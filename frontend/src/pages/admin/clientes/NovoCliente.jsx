import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext"; // ajuste o caminho se necessário
import "../../../css/admin/clientes/NovoCliente.css";

const ClienteNovo = () => {
  const navigate = useNavigate();
  const { cliente } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    role: "cliente",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Proteção: só admin acessa
  if (cliente?.role !== "admin") {
    return <p style={{ color: "red", textAlign: "center" }}>Acesso negado.</p>;
  }

  const handleCancel = () => navigate(-1);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado.");

      await axios.post(
        "http://localhost:5000/api/clientes/create-cliente",
        {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          role: formData.role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Cliente salvo com sucesso!");
      setTimeout(() => navigate("/app/clientes"), 1200);
    } catch (err) {
      const erro = err.response?.data?.error || err.message || "Erro ao salvar.";
      setMessage(`Erro: ${erro}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <main className="cliente-novo-container">
      <button className="voltarBotaoTeste" onClick={handleCancel}>
        ← Voltar
      </button>
      <h2 className="titulo">Perfil de clientes</h2>

      <div className="cliente-form-card">
        <section className="form-header">
          <h3>Dados pessoais</h3>
          <p>Defina as informações do perfil de cliente</p>
        </section>

        <form className="cliente-form" onSubmit={handleSave}>
          {/* CAMPO NOME – MANTIDO DO SEU CÓDIGO ATUAL */}
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Nome completo"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="exemplo@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Defina a senha de acesso"
              value={formData.senha}
              onChange={handleChange}
              required
              minLength="6"
            />
            <small>Mínimo de 6 dígitos</small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancelar"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-salvar"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>

        {/* Mensagem de feedback */}
        {message && (
          <p
            style={{
              marginTop: "12px",
              textAlign: "center",
              color: message.includes("sucesso") ? "green" : "red",
              fontWeight: "500",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
};

export default ClienteNovo;