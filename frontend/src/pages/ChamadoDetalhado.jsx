import { useParams, useNavigate } from "react-router-dom";
import "../css/ChamadoDetalhado.css";

const ChamadoDetalhado = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <main className="chamado-detalhado">
            <button className="voltarBotaoTeste" onClick={() => navigate(-1)}>← Voltar</button>

            <h2 className="titulo-pagina">Chamado detalhado</h2>

            <section className="chamado-card">
                <header className="chamado-header">
                    <div>
                        <p className="chamado-id">{id}</p>
                        <h3 className="chamado-titulo">Backup não está funcionando</h3>
                    </div>
                    <span className="status aberto">Aberto</span>
                </header>

                <article className="chamado-conteudo">
                    <h4>Descrição</h4>
                    <p>
                        O sistema de backup automático parou de funcionar. Última execução
                        bem-sucedida foi há uma semana.
                    </p>

                    <div className="chamado-info">
                        <p><strong>Categoria:</strong> Recuperação de Dados</p>
                        <p><strong>Criado em:</strong> 12/04/25 09:12</p>
                        <p><strong>Atualizado em:</strong> 12/04/25 15:20</p>
                        <p><strong>Cliente:</strong> André Costa</p>
                    </div>
                </article>

                <aside className="tecnico-card">
                    <h4>Técnico responsável</h4>
                    <div className="tecnico-info">
                        <div className="tecnico-avatar">CS</div>
                        <div>
                            <p className="tecnico-nome">Carlos Silva</p>
                            <p className="tecnico-email">carlos.silva@test.com</p>
                        </div>
                    </div>

                    <div className="botoes-status">
                        <button className="btn andamento">Em atendimento</button>
                        <button className="btn encerrado">Encerrado</button>
                    </div>
                </aside>
            </section>
        </main>
    );
};

export default ChamadoDetalhado;
