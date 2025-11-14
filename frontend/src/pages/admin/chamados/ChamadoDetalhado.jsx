// src/pages/admin/chamados/ChamadoDetalhado.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../services/api";
import "../../../css/admin/chamados/ChamadoDetalhado.css";

const ChamadoDetalhado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cliente } = useContext(AuthContext); // usuário logado

  const [chamado, setChamado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const isAdmin = cliente?.role === "admin";
  const isTecnico = cliente?.role === "tecnico";
  const isDono = chamado?.tecnico?.id === cliente?.id;

  useEffect(() => {
    const fetchChamado = async () => {
      try {
        const res = await api.get(`/chamados/${id}`);
        setChamado(res.data);
      } catch (err) {
        setErro(err.response?.data?.error || "Erro ao carregar");
      } finally {
        setLoading(false);
      }
    };
    fetchChamado();
  }, [id]);

  const iniciarAtendimento = async () => {
    try {
      const res = await api.post(`/chamados/${id}/atribuir`, { tecnicoId: cliente.id });
      setChamado(res.data);
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  const atualizarStatus = async (novoStatus) => {
    try {
      const res = await api.put(`/chamados/${id}`, { status: novoStatus });
      setChamado(res.data);
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  const excluirChamado = async () => {
    if (!confirm("EXCLUIR permanentemente?")) return;
    try {
      await api.delete(`/chamados/${id}`);
      alert("Excluído!");
      navigate(isTecnico ? "/app/tecnicos/chamados" : "/app/chamados");
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;
  if (!chamado) return <p>Chamado não encontrado</p>;

  const status = chamado.status?.toLowerCase() || "aberto";

  return (
    <main className="chamado-detalhado">
      <button className="voltarBotaoTeste" onClick={() => navigate(-1)}>
        Voltar
      </button>

      <h2 className="titulo-pagina">Chamado detalhado</h2>

      <section className="chamado-card">
        <header className="chamado-header">
          <div>
            <p className="chamado-id">ID: {chamado.id.slice(0, 8)}</p>
            <h3 className="chamado-titulo">{chamado.nome}</h3>
          </div>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`status ${status}`}>
              {chamado.status}
            </span>
          </p>
        </header>

        <article className="chamado-conteudo">
          <h4>Descrição</h4>
          <p>{chamado.descricao || "Sem descrição."}</p>

          <div className="chamado-info">
            <p><strong>Categoria:</strong> {chamado.categoria}</p>
            <p><strong>Criado em:</strong> {new Date(chamado.createdAt).toLocaleString("pt-BR")}</p>
            <p><strong>Atualizado em:</strong> {new Date(chamado.updatedAt).toLocaleString("pt-BR")}</p>
            <p><strong>Cliente:</strong> {chamado.cliente?.nome} ({chamado.cliente?.email})</p>
          </div>
        </article>

        <aside className="tecnico-card">
          <h4>Técnico responsável</h4>
          {chamado.tecnico ? (
            <div className="tecnico-info">
              <div className="tecnico-avatar">{chamado.tecnico.nome[0].toUpperCase()}</div>
              <div>
                <p className="tecnico-nome">{chamado.tecnico.nome}</p>
                <p className="tecnico-email">{chamado.tecnico.email || "—"}</p>
              </div>
            </div>
          ) : (
            <p>Nenhum técnico atribuído</p>
          )}

          <div className="botoes-status">
            {/* TÉCNICO: INICIAR */}
            {isTecnico && !chamado.tecnico && status === "aberto" && (
              <button className="btn iniciar" onClick={iniciarAtendimento}>
                Iniciar Atendimento
              </button>
            )}

            {/* TÉCNICO: ENCERRAR */}
            {isTecnico && isDono && status === "em atendimento" && (
              <button className="btn encerrado" onClick={() => atualizarStatus("Encerrado")}>
                Encerrar Chamado
              </button>
            )}

            {/* TÉCNICO: REABRIR */}
            {isTecnico && isDono && status === "encerrado" && (
              <button className="btn reabrir" onClick={() => atualizarStatus("Em atendimento")}>
                Reabrir Chamado
              </button>
            )}

            {/* TÉCNICO: EXCLUIR (só se dono + encerrado) */}
            {isTecnico && isDono && status === "encerrado" && (
              <button className="btn excluir" onClick={excluirChamado}>
                Excluir Chamado
              </button>
            )}

            {/* ADMIN: STATUS + EXCLUIR */}
            {isAdmin && (
              <>
                <button className="btn andamento" onClick={() => atualizarStatus("Em atendimento")}>
                  Em atendimento
                </button>
                <button className="btn encerrado" onClick={() => atualizarStatus("Encerrado")}>
                  Encerrar
                </button>
                <button className="btn excluir" onClick={excluirChamado}>
                  Excluir
                </button>
              </>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
};

export default ChamadoDetalhado;