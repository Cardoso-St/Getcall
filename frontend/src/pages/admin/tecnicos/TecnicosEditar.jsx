// src/pages/admin/tecnicos/TecnicosEditar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { AuthContext } from '../../../context/AuthContext';
import '../../../css/admin/tecnicos/TecnicosEditar.css';

const TecnicosEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cliente } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [formacao, setFormacao] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [senha, setSenha] = useState('');
  const [horariosSelecionados, setHorariosSelecionados] = useState({
    manha: [],
    tarde: [],
    noite: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // CARREGA TÉCNICO
  useEffect(() => {
    const carregarTecnico = async () => {
      try {
        const res = await api.get(`/tecnicos/${id}`);
        const t = res.data.tecnico;

        setNome(t.nome || '');
        setEmail(t.email || '');
        setTelefone(t.telefone || '');
        setFormacao(t.formacao || '');
        setEspecialidade(t.especialidade || '');

        const horario = t.horarioDeAtendimento || { manha: [], tarde: [], noite: [] };
        setHorariosSelecionados({
          manha: horario.manha || [],
          tarde: horario.tarde || [],
          noite: horario.noite || []
        });
      } catch (err) {
        setMessage(err.response?.data?.error || "Erro ao carregar técnico");
      } finally {
        setLoading(false);
      }
    };

    carregarTecnico();
  }, [id]);

  // PERMISSÃO: só admin
  if (cliente?.role !== "admin") {
    return <div className="erro-acesso">Acesso negado. Apenas administradores.</div>;
  }

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

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const dados = {
        nome,
        email,
        telefone,
        formacao,
        especialidade,
        horarioDeAtendimento: horariosSelecionados
      };

      if (senha) dados.senha = senha;

      // ROTA CORRETA: PUT /tecnicos/:id
      await api.put(`/tecnicos/${id}`, dados);

      setMessage("Técnico atualizado com sucesso!");
      setTimeout(() => navigate(`/app/tecnicos/${id}`), 1200);
    } catch (err) {
      setMessage(err.response?.data?.error || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  if (loading) {
    return <div className="loading">Carregando técnico...</div>;
  }

  return (
    <main className="tecnico-detalhado">
      <button className="voltar-botao" onClick={() => navigate(-1)}>Voltar</button>
      <div className="header-container">
        <h1 className="titulo-pagina">Editar Técnico - {nome}</h1>
        <div className="botoes-acao">
          <button className="btn-cancelar" onClick={() => navigate('/app/tecnicos')} disabled={saving}>
            Cancelar
          </button>
          <button className="btn-salvar" onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>

      <div className="tecnico-container">
        <section className="dados-pessoais-section">
          <h2>Dados Pessoais</h2>
          <p className="descricao">Edite as informações do perfil do técnico</p>

          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo" />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemplo@email.com" />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(00) 00000-0000" />
          </div>

          <div className="form-group">
            <label>Formação</label>
            <input type="text" value={formacao} onChange={(e) => setFormacao(e.target.value)} placeholder="Ex: Técnico em Informática" />
          </div>

          <div className="form-group">
            <label>Especialidade</label>
            <input type="text" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} placeholder="Ex: Redes, Suporte" />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Deixe em branco para manter"
            />
            <p className="senha-hint">Mínimo de 6 dígitos (opcional)</p>
          </div>
        </section>

        <section className="horarios-atendimento-section">
          <h2>Horário de Atendimento</h2>
          <p className="descricao">Selecione os horários de disponibilidade do técnico</p>

          {/* MANHÃ */}
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

          {/* TARDE */}
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

          {/* NOITE */}
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

      {message && (
        <p style={{
          marginTop: "20px",
          textAlign: "center",
          color: message.includes("sucesso") ? "green" : "red",
          fontWeight: "bold"
        }}>
          {message}
        </p>
      )}
    </main>
  );
};

export default TecnicosEditar;