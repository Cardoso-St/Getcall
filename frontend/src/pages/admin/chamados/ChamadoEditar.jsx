import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../css/admin/chamados/ChamadoEditar.css";
import PageHeader from "../../../components/PageHeader";

const EditarChamado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chamado, setChamado] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    status: "Aberto",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Buscar chamado por ID
  useEffect(() => {
    const fetchChamado = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/chamados/${id}`
        );
        if (!response.ok) throw new Error("Erro ao buscar chamado.");

        const data = await response.json();
        setChamado({
          nome: data.nome || "",
          descricao: data.descricao || "",
          categoria: data.categoria || "",
          status: data.status || "Aberto",
        });
      } catch (error) {
        console.error("Erro ao carregar chamado:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChamado();
  }, [id]);

  // 🔹 Atualizar o estado do formulário
  const handleChange = (e) => {
    setChamado({ ...chamado, [e.target.name]: e.target.value });
  };

  // 🔹 Salvar alterações
  const handleSave = async () => {
    if (!chamado.nome || !chamado.descricao || !chamado.categoria) {
      console.warn("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/chamados/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chamado),
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || "Erro ao salvar alterações.");
      }

      console.log("✅ Chamado atualizado com sucesso!");
      navigate("/app/chamados"); // Redireciona sem alert
    } catch (error) {
      console.error("Erro ao editar chamado:", error);
    }
  };

  if (loading) {
    return <div className="editar-container">Carregando chamado...</div>;
  }

  return (
    <div className="editar-container">
      <PageHeader title={`Editar Chamado #${id}`} />

      <form className="editar-form">
        <label>
          Nome do Chamado:
          <input
            type="text"
            name="nome"
            value={chamado.nome}
            onChange={handleChange}
            placeholder="Digite o título do chamado"
          />
        </label>

        <label>
          Descrição:
          <textarea
            name="descricao"
            value={chamado.descricao}
            onChange={handleChange}
            rows={4}
            placeholder="Descreva o problema"
          />
        </label>

        <label>
          Categoria:
          <select
            name="categoria"
            value={chamado.categoria}
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
          Status:
          <select name="status" value={chamado.status} onChange={handleChange}>
            <option value="Aberto">Aberto</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Encerrado">Encerrado</option>
          </select>
        </label>

        <button type="button" onClick={handleSave}>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditarChamado;
