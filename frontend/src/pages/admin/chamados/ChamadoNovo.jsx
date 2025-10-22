import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/admin/chamados/ChamadoNovo.css";
import PageHeader from "../../../components/PageHeader";

const NovoChamado = () => {
  const navigate = useNavigate();

  const [novoChamado, setNovoChamado] = useState({
    titulo: "",
    servico: "",
    descricao: "",
    categoria: "",
    cliente: "",
    tecnico: "",
    status: "aberto",
  });

  const handleChange = (e) => {
    setNovoChamado({ ...novoChamado, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Novo chamado criado:", novoChamado);
    navigate("/app/chamados");
  };

  return (
    <div className="novo-container">
      <PageHeader title="Novo Chamado" onNewClick={null} />

      <form className="novo-form">
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={novoChamado.titulo}
            onChange={handleChange}
            placeholder="Ex: Sistema travando ao iniciar"
          />
        </label>

        <label>
          Serviço:
          <input
            type="text"
            name="servico"
            value={novoChamado.servico}
            onChange={handleChange}
            placeholder="Ex: Manutenção de Software"
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
          <input
            type="text"
            name="categoria"
            value={novoChamado.categoria}
            onChange={handleChange}
            placeholder="Ex: Software"
          />
        </label>

        <label>
          Cliente:
          <input
            type="text"
            name="cliente"
            value={novoChamado.cliente}
            onChange={handleChange}
            placeholder="Nome do cliente"
          />
        </label>

        <label>
          Técnico responsável:
          <input
            type="text"
            name="tecnico"
            value={novoChamado.tecnico}
            onChange={handleChange}
            placeholder="Nome do técnico (opcional)"
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={novoChamado.status}
            onChange={handleChange}
          >
            <option value="aberto">Aberto</option>
            <option value="andamento">Em Andamento</option>
            <option value="encerrado">Encerrado</option>
          </select>
        </label>

        <div className="botoes-acao">
          <button
            type="button"
            className="btn-voltar"
            onClick={() => navigate(-1)}
          >
            ← Cancelar
          </button>
          <button type="button" className="btn-salvar" onClick={handleSave}>
            Criar Chamado
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovoChamado;
