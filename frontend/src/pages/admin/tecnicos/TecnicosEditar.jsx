import React, { useState, useEffect } from 'react'; // useEffect ADICIONADO
import { useParams, useNavigate } from 'react-router-dom';
import '../../../css/admin/tecnicos/TecnicosEditar.css';

const TecnicosEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado inicial
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [horariosSelecionados, setHorariosSelecionados] = useState({
    manha: [],
    tarde: [],
    noite: []
  });
  const [loading, setLoading] = useState(true); // ADICIONADO

  // FUNÇÃO PARA CARREGAR DADOS DO TÉCNICO - ADICIONADA
  useEffect(() => {
    const carregarTecnico = () => {
      // Simula busca de dados (substitua por chamada real de API)
      const todosTecnicos = [
        {
          id: 1,
          nome: "Carlos Silva",
          email: "carlos.silva@test.com",
          disponibilidade: "08:00 09:00 10:00 11:00 -4",
        },
        {
          id: 2,
          nome: "Aline Souza",
          email: "aline.souza@tecnico.com",
          disponibilidade: "09:00 10:00 14:00 15:00 -4",
        },
        {
          id: 3,
          nome: "Julia Maria",
          email: "julia.maria@tecnico.com",
          disponibilidade: "08:00 09:00 10:00 -4",
        },
      ];

      const tecnico = todosTecnicos.find(t => t.id === parseInt(id));
      
      if (tecnico) {
        setNome(tecnico.nome);
        setEmail(tecnico.email);
        
        // Parse da disponibilidade para checkboxes
        if (tecnico.disponibilidade) {
          const horarios = tecnico.disponibilidade
            .split(' ')
            .filter(h => h !== '-4'); // Remove o timezone
          
          const manha = horarios.filter(h => 
            ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00'].includes(h)
          );
          const tarde = horarios.filter(h => 
            ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].includes(h)
          );
          const noite = horarios.filter(h => 
            ['19:00', '20:00', '21:00', '22:00', '23:00'].includes(h)
          );

          setHorariosSelecionados({
            manha,
            tarde,
            noite
          });
        }
      }
      
      setLoading(false);
    };

    carregarTecnico();
  }, [id]);

  const toggleHorario = (periodo, horario) => {
    setHorariosSelecionados(prev => {
      const updated = { ...prev };
      if (updated[periodo].includes(horario)) {
        updated[periodo] = updated[periodo].filter(h => h !== horario);
      } else {
        updated[periodo] = [...updated[periodo], horario];
      }
      return updated;
    });
  };

  const handleSave = () => {
    // Monta todos os horários selecionados
    const todosHorarios = [
      ...horariosSelecionados.manha,
      ...horariosSelecionados.tarde,
      ...horariosSelecionados.noite
    ].join(' ') + ' -4';
    
    console.log('Dados salvos:', { 
      id, 
      nome, 
      email, 
      senha: senha || 'mantida', 
      disponibilidade: todosHorarios 
    });
    
    navigate('/app/tecnicos');
  };

  const timeSlots = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
                    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
                    '19:00', '20:00', '21:00', '22:00', '23:00'];

  // Loading
  if (loading) {
    return <div className="loading">Carregando técnico...</div>;
  }

  return (
    <main className="tecnico-detalhado">
      <button className="voltar-botao" onClick={() => navigate(-1)}>← Voltar</button>
      <div className="header-container">
        <h1 className="titulo-pagina">Editar Técnico - {nome}</h1>
        <div className="botoes-acao">
          <button className="btn-cancelar" onClick={() => navigate('/app/tecnicos')}>Cancelar</button>
          <button className="btn-salvar" onClick={handleSave}>Salvar</button>
        </div>
      </div>
      <div className="tecnico-container">
        <section className="dados-pessoais-section">
          <h2>Dados Pessoais</h2>
          <p className="descricao">Edite as informações do perfil do técnico</p>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome completo"
            />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Deixe em branco para manter a senha atual"
            />
            <p className="senha-hint">Mínimo de 6 dígitos (opcional)</p>
          </div>
        </section>
        <section className="horarios-atendimento-section">
          <h2>Horário de Atendimento</h2>
          <p className="descricao">Selecione os horários de disponibilidade do técnico</p>
          {/* Resto do código dos horários permanece igual */}
          <div className="horario-periodo">
            <h3>Manhã</h3>
            <div className="horarios-lista">
              {timeSlots.slice(0, 6).map(time => (
                <label key={time} className="horario-item">
                  <input
                    type="checkbox"
                    checked={horariosSelecionados.manha.includes(time)}
                    onChange={() => toggleHorario('manha', time)}
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>
          <div className="horario-periodo">
            <h3>Tarde</h3>
            <div className="horarios-lista">
              {timeSlots.slice(6, 12).map(time => (
                <label key={time} className="horario-item">
                  <input
                    type="checkbox"
                    checked={horariosSelecionados.tarde.includes(time)}
                    onChange={() => toggleHorario('tarde', time)}
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>
          <div className="horario-periodo">
            <h3>Noite</h3>
            <div className="horarios-lista">
              {timeSlots.slice(12).map(time => (
                <label key={time} className="horario-item">
                  <input
                    type="checkbox"
                    checked={horariosSelecionados.noite.includes(time)}
                    onChange={() => toggleHorario('noite', time)}
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TecnicosEditar;