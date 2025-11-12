// src/pages/admin/tecnicos/TecnicoDetalhado.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../services/api"; // ← IMPORTA api.js
import "../../../css/admin/tecnicos/TecnicoDetalhado.css";

const TecnicoDetalhado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tecnico, setTecnico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Função para formatar horários
  const formatarHorarios = (horarioObj) => {
    if (!horarioObj || typeof horarioObj !== "object") return "—";

    return Object.entries(horarioObj)
      .map(([periodo, horarios]) => {
        if (!Array.isArray(horarios) || horarios.length === 0) return null;
        return `<strong>${periodo}:</strong> ${horarios.sort().join(", ")}`;
      })
      .filter(Boolean)
      .join(" | ") || "—";
  };

  useEffect(() => {
    const carregarTecnico = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get(`/tecnicos/${id}`);
        setTecnico(res.data.tecnico);
      } catch (err) {
        setError(err.response?.data?.error || "Erro ao carregar técnico");
      } finally {
        setLoading(false);
      }
    };

    carregarTecnico();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <main className="tecnico-detalhado">
        <button className="voltar" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        <p style={{ textAlign: "center", marginTop: "40px" }}>Carregando técnico...</p>
      </main>
    );
  }

  // Erro
  if (error) {
    return (
      <main className="tecnico-detalhado">
        <button className="voltar" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        <p style={{ color: "red", textAlign: "center", marginTop: "40px" }}>
          {error}
        </p>
      </main>
    );
  }

  // Dados reais
  const { nome, email, telefone, formacao, especialidade, horarioDeAtendimento } = tecnico;

  return (
    <main className="tecnico-detalhado">
      <button className="voltar" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <h2 className="titulo-pagina">Técnico Detalhado</h2>

      <section className="tecnico-card">
        <header className="tecnico-header">
          <div className="tecnico-avatar-grande">
            {nome
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div className="tecnico-dados">
            <h3 className="tecnico-nome">{nome}</h3>
            <p className="tecnico-email">{email}</p>
            <p className="tecnico-status ativo">Ativo</p>
          </div>
        </header>

        <div className="tecnico-info">
          <div className="info-card">
            <h4>Dados Pessoais</h4>
            <p>
              <strong>ID:</strong> {id}
            </p>
            <p>
              <strong>Telefone:</strong> {telefone || "—"}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
          </div>

          <div className="info-card">
            <h4>Formação e Especialidade</h4>
            <p>
              <strong>Formação:</strong> {formacao || "—"}
            </p>
            <p>
              <strong>Especialidade:</strong> {especialidade || "—"}
            </p>
            <p>
              <strong>Certificações:</strong> —
            </p>
          </div>

          <div className="info-card">
            <h4>Horário de Atendimento</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: formatarHorarios(horarioDeAtendimento),
              }}
            />
          </div>

          <div className="info-card">
            <h4>Experiência</h4>
            <p>
              <strong>Chamados Atendidos:</strong> 0
            </p>
            <p>
              <strong>Projetos Realizados:</strong> —
            </p>
          </div>

          <div className="info-card">
            <h4>Observações</h4>
            <p>Profissional cadastrado no sistema.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TecnicoDetalhado;