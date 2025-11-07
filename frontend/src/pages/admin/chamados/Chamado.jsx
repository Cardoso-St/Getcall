import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/admin/chamados/Chamados.css";
import PageHeader from "../../../components/PageHeader";
import ActionButton from "../../../components/ActionButton";

const Chamados = () => {
  const navigate = useNavigate();
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Buscar todos os chamados
  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/chamados");
        if (!response.ok) throw new Error("Erro ao buscar chamados.");
        const data = await response.json();
        setChamados(data);
      } catch (error) {
        console.error("Erro ao buscar chamados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChamados();
  }, []);

  // 🔹 Navegar para detalhes
  const handleRowClick = (id) => navigate(`/app/chamado/${id}`);

  // 🔹 Editar chamado
  const handleEditClick = (id) => navigate(`/app/chamado/editar/${id}`);

  // 🔹 Deletar chamado
  const handleDeleteClick = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este chamado?"
    );
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:5000/api/chamados/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || "Erro ao excluir chamado.");
      }

      // Atualiza a lista sem o item excluído
      setChamados((prevChamados) => prevChamados.filter((ch) => ch.id !== id));

      console.log(`✅ Chamado ${id} excluído com sucesso`);
    } catch (error) {
      console.error("Erro ao excluir chamado:", error);
      alert(error.message || "Erro ao excluir o chamado.");
    }
  };

  if (loading) return <p>Carregando chamados...</p>;

  return (
    <div className="chamados-container">
      {/* Cabeçalho */}
      <PageHeader
        title="Chamados"
        onNewClick={() => navigate("/app/chamado/novo")}
      />

      {/* Tabela principal */}
      <table className="tecnicos-table">
        <thead>
          <tr>
            <th>Atualizado em</th>
            <th>ID</th>
            <th>Título e Descrição</th>
            <th>Cliente</th>
            <th>Técnico</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {chamados.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Nenhum chamado encontrado.
              </td>
            </tr>
          ) : (
            chamados.map((chamado) => (
              <tr
                key={chamado.id}
                onClick={() => handleRowClick(chamado.id)}
                className="chamado-row"
              >
                <td>
                  {new Date(chamado.updatedAt).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td>{chamado.id.slice(0, 6)}</td>
                <td>
                  <strong>{chamado.nome}</strong>
                  <br />
                  {chamado.descricao}
                </td>
                <td>{chamado.cliente?.nome || "—"}</td>
                <td>{chamado.tecnico?.nome || "—"}</td>
                <td>
                  <span className={`status ${chamado.status.toLowerCase()}`}>
                    {chamado.status}
                  </span>
                </td>
                <td style={{ display: "flex", gap: "6px" }}>
                  <ActionButton
                    type="delete"
                    title="Excluir chamado"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(chamado.id);
                    }}
                  />
                  <ActionButton
                    type="edit"
                    title="Editar chamado"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(chamado.id);
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Chamados;
