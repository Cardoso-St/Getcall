import { useParams, useNavigate } from "react-router-dom";
import "../../../css/admin/tecnicos/TecnicoDetalhado.css";

const TecnicoDetalhado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <main className="tecnico-detalhado">
      <button className="voltar" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <h2 className="titulo-pagina">Técnico Detalhado</h2>

      <section className="tecnico-card">
        <header className="tecnico-header">
          <div className="tecnico-avatar-grande">CS</div>
          <div className="tecnico-dados">
            <h3 className="tecnico-nome">Carlos Silva</h3>
            <p className="tecnico-email">carlos.silva@test.com</p>
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
              <strong>Telefone:</strong> (82) 98888-1234
            </p>
            <p>
              <strong>Email:</strong> carlos.silva@test.com
            </p>
          </div>

          <div className="info-card">
            <h4>Formação e Especialidade</h4>
            <p>
              <strong>Formação:</strong> Engenharia de Computação
            </p>
            <p>
              <strong>Especialidade:</strong> Redes e Infraestrutura
            </p>
            <p>
              <strong>Certificações:</strong> CCNA, CompTIA Network+
            </p>
          </div>

          <div className="info-card">
            <h4>Experiência</h4>
            <p>
              <strong>Data de Contratação:</strong> 10/02/2023
            </p>
            <p>
              <strong>Chamados Atendidos:</strong> 45
            </p>
            <p>
              <strong>Projetos Realizados:</strong> Backup Corporativo, Migração
              de Servidores
            </p>
          </div>

          <div className="info-card">
            <h4>Observações</h4>
            <p>
              Profissional dedicado com experiência em suporte técnico e
              administração de redes.
            </p>
            <p>
              Disponível para turnos manhã e tarde, conforme necessidade do
              cliente.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TecnicoDetalhado;
