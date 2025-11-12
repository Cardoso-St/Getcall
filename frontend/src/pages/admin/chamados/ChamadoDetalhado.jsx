// src/pages/admin/chamados/ChamadoDetalhado.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../../css/admin/chamados/ChamadoDetalhado.css";

const ChamadoDetalhado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chamado, setChamado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchChamado = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/chamados/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 401) {
          setErro("Sessão expirada. Faça login novamente.");
          return;
        }

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Erro ao buscar o chamado");
        }

        const data = await response.json();
        setChamado(data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChamado();
  }, [id]);

  const atualizarStatus = async (novoStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/chamados/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: novoStatus }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar status");

      const data = await response.json();
      setChamado(data);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Carregando detalhes do chamado...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;
  if (!chamado) return <p>Chamado não encontrado.</p>;

  return (
    <main className="chamado-detalhado">
      <button className="voltarBotaoTeste" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <h2 className="titulo-pagina">Chamado detalhado</h2>

      <section className="chamado-card">
        <header className="chamado-header">
          <div>
            <p className="chamado-id">ID: {chamado.id}</p>
            <h3 className="chamado-titulo">{chamado.nome}</h3>
          </div>
          <span
            className={`status ${chamado.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {chamado.status}
          </span>
        </header>

        <article className="chamado-conteudo">
          <h4>Descrição</h4>
          <p>{chamado.descricao || "Sem descrição detalhada."}</p>

          <div className="chamado-info">
            <p>
              <strong>Categoria:</strong> {chamado.categoria}
            </p>
            <p>
              <strong>Criado em:</strong>{" "}
              {new Date(chamado.createdAt).toLocaleString("pt-BR")}
            </p>
            <p>
              <strong>Atualizado em:</strong>{" "}
              {new Date(chamado.updatedAt).toLocaleString("pt-BR")}
            </p>
            <p>
              <strong>Cliente:</strong> {chamado.cliente?.nome} (
              {chamado.cliente?.email})
            </p>
          </div>
        </article>

        <aside className="tecnico-card">
  <h4>Técnico responsável</h4>
  {chamado.tecnico ? (
    <div className="tecnico-info">
      <div className="tecnico-avatar">
        {chamado.tecnico.nome[0].toUpperCase()}
      </div>
      <div>
        <p className="tecnico-nome">{chamado.tecnico.nome}</p>
        <p className="tecnico-email">{chamado.tecnico.email || "—"}</p>
      </div>
    </div>
  ) : (
    <p>Nenhum técnico atribuído</p>
  )}

  <div className="botoes-status">
    <button
      className="btn andamento"
      onClick={() => atualizarStatus("Em atendimento")}
      disabled={chamado.status === "Em atendimento"}
    >
      Em atendimento
    </button>
    <button
      className="btn encerrado"
      onClick={() => atualizarStatus("Encerrado")}
      disabled={chamado.status === "Encerrado"}
    >
      Encerrar
    </button>
  </div>
</aside>
      </section>
    </main>
  );
};

export default ChamadoDetalhado;
