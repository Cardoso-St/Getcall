import { useNavigate } from "react-router-dom";
import "../../../css/admin/chamados/Chamados.css";
import PageHeader from "../../../components/PageHeader";
import ActionButton from "../../../components/ActionButton";

const Chamados = () => {
  const navigate = useNavigate();

  // Função chamada ao clicar na linha
  const handleRowClick = (id) => {
    navigate(`/app/chamado/${id}`);
  };

  // Função de editar
  const handleEditClick = (id) => {
    navigate(`/app/chamado/editar/${id}`);
  };

  // Função de deletar
  const handleDeleteClick = (id) => {
    console.log(`Excluir chamado ${id}`);
  };

  return (
    <div className="chamados-container">
      {/* Cabeçalho */}
      <PageHeader
        title="Chamados"
        onNewClick={() => navigate("/app/chamado/novo")} // ✅ aqui
      />

      {/* Tabela principal */}
      <table className="tecnicos-table">
        <thead>
          <tr>
            <th>Atualizado em</th>
            <th>Id</th>
            <th>Título e Serviço</th>
            <th>Cliente</th>
            <th>Técnico</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => handleRowClick("00004")} className="chamado-row">
            <td>12/04/25 20:56</td>
            <td>00004</td>
            <td>
              <strong>Backup não está funcionando</strong>
              <br />
              Recuperação de Dados
            </td>
            <td>André Costa</td>
            <td>Carlos Silva</td>
            <td>
              <span className="status aberto">Aberto</span>
            </td>
            <td style={{ display: "flex", gap: "6px" }}>
              <ActionButton
                type="delete"
                title="Excluir chamado"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick("00004");
                }}
              />
              <ActionButton
                type="edit"
                title="Editar chamado"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick("00004");
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Chamados;
