import "../css/Chamados.css";

const Chamados = () => {
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
          {/* bloco de chamados */}
          <tbody>
            <tr>
              <td>12/04/25 20:56</td>
              <td>00001</td>
              <td>
                <strong>Rede lenta</strong>
                <br />
                Instalação de Rede
              </td>
              <td>André Costa</td>
              <td>Carlos Silva</td>
              <td>
                <span className="status aberto">Aberto</span>
              </td>
              <td>✏️</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chamados;
