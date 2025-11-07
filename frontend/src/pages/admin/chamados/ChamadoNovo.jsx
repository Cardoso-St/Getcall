import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/admin/chamados/ChamadoNovo.css";
import PageHeader from "../../../components/PageHeader";
import { AuthContext } from "../../../context/AuthContext";

const NovoChamado = () => {
  const navigate = useNavigate();
  const { cliente } = useContext(AuthContext); // mantém o cliente logado para vincular ao chamado

  const [novoChamado, setNovoChamado] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    tecnico: "",
    status: "Aberto",
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setNovoChamado({ ...novoChamado, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!cliente || !cliente.id) {
      setErro("Erro: cliente não identificado. Faça login novamente.");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const response = await fetch("http://localhost:5000/api/chamados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // envia o token JWT
        },
        body: JSON.stringify({
          nome: novoChamado.nome,
          descricao: novoChamado.descricao,
          categoria: novoChamado.categoria,
          tecnico: novoChamado.tecnico || null,
          status: novoChamado.status,
          cliente_id: cliente.id, // vem direto do contexto
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar chamado");
      }

      console.log("✅ Chamado criado com sucesso:", data);
      navigate("/app/chamados");
    } catch (err) {
      console.error("Erro:", err);
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="novo-container">
      <PageHeader title="Novo Chamado" onNewClick={null} />

      <form className="novo-form">
        <label>
          Título:
          <input
            type="text"
            name="nome"
            value={novoChamado.nome}
            onChange={handleChange}
            placeholder="Ex: Sistema travando ao iniciar"
          />
        </label>

        <label>
          Descrição:
          <textarea
            name="descricao"
            value={novoChamado.descricao}
            onChange={handleChange}
            rows={4}
            placeholder="Descreva o problema detalhadamente..."
          />
        </label>

        <label>
          Categoria:
          <select
            name="categoria"
            value={novoChamado.categoria}
            onChange={handleChange}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Rede">Rede</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Suporte Técnico">Suporte Técnico</option>
            <option value="Acesso ao Sistema">Acesso ao Sistema</option>
            <option value="Backup">Backup</option>
            <option value="Impressora">Impressora</option>
            <option value="Segurança da Informação">
              Segurança da Informação
            </option>
            <option value="Infraestrutura">Infraestrutura</option>
            <option value="Outro">Outro</option>
          </select>
        </label>

        <label>
          Técnico responsável (opcional):
          <input
            type="text"
            name="tecnico"
            value={novoChamado.tecnico}
            onChange={handleChange}
            placeholder="Nome do técnico"
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={novoChamado.status}
            onChange={handleChange}
          >
            <option value="Aberto">Aberto</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Encerrado">Encerrado</option>
          </select>
        </label>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <div className="botoes-acao">
          <button
            type="button"
            className="btn-voltar"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            ← Cancelar
          </button>
          <button
            type="button"
            className="btn-salvar"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Criar Chamado"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovoChamado;
