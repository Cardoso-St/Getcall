import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/admin/ChamadoEditar.css"
import PageHeader from "../../components/PageHeader";

const EditarChamado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chamado, setChamado] = useState({
    titulo: "",
    servico: "",
    descricao: "",
    categoria: "",
    cliente: "",
    tecnico: "",
    status: "aberto",
  });

  // Simula busca de dados do chamado
  useEffect(() => {
    setChamado({
      titulo: "Backup não está funcionando",
      servico: "Recuperação de Dados",
      descricao:
        "O sistema de backup automático parou de funcionar. Última execução bem-sucedida foi há uma semana.",
      categoria: "Recuperação de Dados",
      cliente: "André Costa",
      tecnico: "Carlos Silva",
      status: "aberto",
    });
  }, [id]);

  const handleChange = (e) => {
    setChamado({ ...chamado, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Chamado salvo:", chamado);
    navigate("/app/chamados");
  };

  return (
    <div className="editar-container">
      <PageHeader title={`Editar Chamado ${id}`} onNewClick={null} />

      <form className="editar-form">
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={chamado.titulo}
            onChange={handleChange}
          />
        </label>

        <label>
          Serviço:
          <input
            type="text"
            name="servico"
            value={chamado.servico}
            onChange={handleChange}
          />
        </label>

        <label>
          Descrição:
          <textarea
            name="descricao"
            value={chamado.descricao}
            onChange={handleChange}
            rows={4}
          />
        </label>

        <label>
          Categoria:
          <input
            type="text"
            name="categoria"
            value={chamado.categoria}
            onChange={handleChange}
          />
        </label>

        <label>
          Cliente:
          <input
            type="text"
            name="cliente"
            value={chamado.cliente}
            onChange={handleChange}
          />
        </label>

        <label>
          Técnico:
          <input
            type="text"
            name="tecnico"
            value={chamado.tecnico}
            onChange={handleChange}
          />
        </label>

        <label>
          Status:
          <select name="status" value={chamado.status} onChange={handleChange}>
            <option value="aberto">Aberto</option>
            <option value="andamento">Em Andamento</option>
            <option value="encerrado">Encerrado</option>
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
