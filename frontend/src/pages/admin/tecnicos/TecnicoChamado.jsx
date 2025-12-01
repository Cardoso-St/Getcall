// src/pages/tecnico/MeusChamados.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { AuthContext } from "../../../context/AuthContext";
import "../../../css/admin/tecnicos/TecnicoChamados.css";

const TecnicoChamados = () => {
  const navigate = useNavigate();
  const { cliente } = useContext(AuthContext);

  const [chamados, setChamados] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await api.get("/chamados");
        setChamados(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  const iniciarChamado = async (chamadoId) => {
    try {
      const res = await api.post(`/chamados/${chamadoId}/atribuir`, {
        tecnicoId: cliente.id,
      });

      setChamados(prev =>
        prev.map(c =>
          c.id === chamadoId
            ? { ...c, tecnico: { nome: cliente.nome }, status: "Em atendimento" }
            : c
        )
      );
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao iniciar");
    }
  };

  const chamadosFiltrados = chamados
    .filter(c => {
      if (filtro === "Todos") return true;
      if (filtro === "Abertos") return c.status === "Aberto";
      if (filtro === "Pendentes") return c.status === "Em andamento";
      if (filtro === "Fechados") return c.status === "Encerrado";
      return true;
    })
    .filter(c =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.descricao.toLowerCase().includes(busca.toLowerCase())
    );

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="tecnico-chamados-container">
      <h1>Meus chamados</h1>

      <div className="tecnico-chamados-filtros">
        <input
          type="text"
          placeholder="Buscar chamados..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <div className="tecnico-chamados-botoes-filtro">
          {["Todos", "Abertos", "Pendentes", "Encerrados"].map(f => (
            <button
              key={f}
              className={filtro === f ? "ativo" : ""}
              onClick={() => setFiltro(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="tecnico-chamados-grid">
        {chamadosFiltrados.length === 0 ? (
          <p>Nenhum chamado encontrado.</p>
        ) : (
          chamadosFiltrados.map(chamado => (
            <div key={chamado.id} className="tecnico-chamado-card">
              <div className="tecnico-card-header">
                <span className="tecnico-id">#{chamado.id.slice(0, 6)}</span>
                <button
                  className="tecnico-edit-btn"
                  onClick={() => navigate(`/app/chamado/${chamado.id}`)}
                >
                  Editar
                </button>
              </div>
              <h3>{chamado.nome}</h3>
              <p className="tecnico-categoria">{chamado.categoria}</p>
              <p className="tecnico-data">
                {new Date(chamado.updatedAt).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <div className="tecnico-cliente-info">
                <span className="tecnico-avatar">
                  {chamado.cliente?.nome[0] || "?"}
                </span>
                <span>{chamado.cliente?.nome || "Cliente"}</span>
              </div>

              <div className="tecnico-status-actions">
                <span
                  className={`tecnico-status-badge ${
                    chamado.status === "Em andamento"
                      ? "em-atendimento"
                      : chamado.status.toLowerCase().replace(" ", "-")
                  }`}
                >
                  {chamado.status === "Em atendimento" ? "Em atendimento" : chamado.status}
                </span>

                {!chamado.tecnico && chamado.status !== "Encerrado" && (
                  <button
                    className="tecnico-btn-iniciar"
                    onClick={() => iniciarChamado(chamado.id)}
                  >
                    Iniciar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TecnicoChamados;