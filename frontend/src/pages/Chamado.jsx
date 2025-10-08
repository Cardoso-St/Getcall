import { useNavigate } from "react-router-dom";
import "../css/Chamados.css";

const Chamados = () => {
  const navigate = useNavigate();

  // Função chamada ao clicar na linha
  const handleRowClick = (id) => {
    navigate(`/app/chamado/${id}`);
  };

  const handleEditClick = (e, id) => {
    e.stopPropagation(); // impede o clique de abrir o detalhe do chamado
    console.log(`Editar chamado ${id}`);
    // aqui depois você pode abrir um modal ou redirecionar
  };

  return (
    <div className="chamados">
      <h2 className="chamados-title">Chamados</h2>

      <div className="chamados-table-container">
        <table className="chamados-table">
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
              <td>
                <button
                  className="acao-botao editar"
                  onClick={(e) => handleEditClick(e, "00004")}
                >
                  ✏️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chamados;
