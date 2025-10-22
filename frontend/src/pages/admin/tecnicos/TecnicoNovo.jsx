import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../css/admin/tecnicos/TecnicoNovo.css';

const TecnicosNovo = () => {
  const navigate = useNavigate();

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [formacao, setFormacao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [horariosSelecionados, setHorariosSelecionados] = useState({
    manha: [],
    tarde: [],
    noite: []
  });

  const handleCancel = () => navigate(-1);

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
    const todosHorarios = [
      ...horariosSelecionados.manha,
      ...horariosSelecionados.tarde,
      ...horariosSelecionados.noite
    ].join(' ') + ' -4';

    console.log('Técnico salvo:', {
      nome,
      email,
      senha,
      formacao,
      telefone,
      especialidade,
      disponibilidade: todosHorarios
    });

    alert("Técnico salvo com sucesso!");
    navigate('/app/tecnicos');
  };

  const timeSlots = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00', '23:00'];

  return (
    <main className="tecnico-novo-container">
      <button className="voltarBotaoTeste" onClick={handleCancel}>← Voltar</button>
      <h2 className="titulo">Perfil de Técnico</h2>

      <div className="tecnico-form-card">
        {/* SEÇÃO 1: DADOS PESSOAIS - EXATAMENTE IGUAL AO CLIENTE */}
        <section className="form-header">
          <h3>Dados pessoais</h3>
          <p>Defina as informações do perfil de técnico</p>
        </section>

        <form className="tecnico-form">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="exemplo@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Defina a senha de acesso"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <small>Mínimo de 6 dígitos</small>
          </div>
        </form>

        {/* SEÇÃO 2: FORMAÇÃO E ESPECIALIDADE */}
        <section className="form-header">
          <h3>Formação profissional</h3>
          <p>Defina a formação acadêmica e especialização do técnico</p>
        </section>

        <form className="tecnico-form">
          <div className="form-group">
            <label htmlFor="formacao">Formação</label>
            <input
              id="formacao"
              type="text"
              placeholder="Ex: Técnico em Eletrônica"
              value={formacao}
              onChange={(e) => setFormacao(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="especialidade">Especialidade</label>
            <input
              id="especialidade"
              type="text"
              placeholder="Ex: Redes, Automação, Refrigeração"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
            />
          </div>
        </form>

        {/* SEÇÃO 3: HORÁRIOS - NOVA SEÇÃO */}
        <section className="form-header">
          <h3>Horário de atendimento</h3>
          <p>Selecione os horários de disponibilidade do técnico</p>
        </section>

        <div className="horarios-container">
          <div className="horario-periodo">
            <h4>Manhã</h4>
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
            <h4>Tarde</h4>
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
            <h4>Noite</h4>
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
        </div>

        {/* BOTÕES - EXATAMENTE IGUAIS AO CLIENTE */}
        <div className="form-actions">
          <button className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
          <button className="btn-salvar" onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </main>
  );
};

export default TecnicosNovo;