// pages/admin/tecnicos/TecnicoNovo.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import api from '../../../services/api'
import "../../../css/admin/tecnicos/TecnicoNovo.css";

const TecnicosNovo = () => {
  const navigate = useNavigate();
  const { cliente } = useContext(AuthContext);

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [formacao, setFormacao] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [horariosSelecionados, setHorariosSelecionados] = useState({
    manha: [],
    tarde: [],
    noite: [],
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Proteção: só admin
  if (cliente?.role !== "admin") {
    return <p style={{ color: "red", textAlign: "center" }}>Acesso negado.</p>;
  }

  const timeSlots = [
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
    "19:00", "20:00", "21:00", "22:00", "23:00"
  ];

  const toggleHorario = (periodo, horario) => {
    setHorariosSelecionados((prev) => {
      const updated = { ...prev };
      if (updated[periodo].includes(horario)) {
        updated[periodo] = updated[periodo].filter((h) => h !== horario);
      } else {
        updated[periodo] = [...updated[periodo], horario];
      }
      return updated;
    });
  };

  const handleNext = () => {
    if (!nome || !email || !senha || !telefone) {
      setMessage("Preencha todos os campos obrigatórios.");
      return;
    }
    setMessage("");
    setStep(2);
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado.");

      await api.post("/tecnicos", {
  nome,
  email,
  senha,
  telefone,
  formacao,
  especialidade,
  horarioDeAtendimento: horariosSelecionados,
});

      setMessage("Técnico criado com sucesso!");
      setTimeout(() => navigate("/app/tecnicos"), 1200);
    } catch (err) {
      const erro = err.response?.data?.error || "Erro ao criar técnico.";
      setMessage(`Erro: ${erro}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="tecnico-novo-container">
      <button className="voltarBotaoTeste" onClick={() => navigate(-1)}>
        ← Voltar
      </button>
      <h2 className="titulo">Cadastro de Técnico</h2>

      <div className="tecnico-form-card">
        {/* ETAPA 1 */}
        {step === 1 && (
          <>
            <section className="form-header">
              <h3>Dados pessoais</h3>
              <p>Preencha as informações básicas do técnico</p>
            </section>

            <div className="tecnico-form">
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
                  placeholder="exemplo@mail.com"
                />
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-cancelar" onClick={() => navigate(-1)} disabled={loading}>
                Cancelar
              </button>
              <button className="btn-salvar" onClick={handleNext} disabled={loading}>
                Continuar →
              </button>
            </div>
          </>
        )}

        {/* ETAPA 2 */}
        {step === 2 && (
          <>
            <section className="form-header">
              <h3>Formação e horários</h3>
              <p>Defina formação, especialidade e disponibilidade</p>
            </section>

            <div className="tecnico-form">
              <div className="form-group">
                <label>Formação</label>
                <input
                  type="text"
                  value={formacao}
                  onChange={(e) => setFormacao(e.target.value)}
                  placeholder="Ex: Técnico em Informática"
                />
              </div>

              <div className="form-group">
                <label>Especialidade</label>
                <input
                  type="text"
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                  placeholder="Ex: Redes, Suporte"
                />
              </div>
            </div>

            <section className="form-header">
              <h3>Horário de atendimento</h3>
              <p>Selecione os horários de disponibilidade</p>
            </section>

            <div className="horarios-container">
              <div className="horario-periodo">
                <h4>Manhã</h4>
                <div className="horarios-lista">
                  {timeSlots.slice(0, 6).map((time) => (
                    <label key={time} className="horario-item">
                      <input
                        type="checkbox"
                        checked={horariosSelecionados.manha.includes(time)}
                        onChange={() => toggleHorario("manha", time)}
                      />
                      {time}
                    </label>
                  ))}
                </div>
              </div>

              <div className="horario-periodo">
                <h4>Tarde</h4>
                <div className="horarios-lista">
                  {timeSlots.slice(6, 12).map((time) => (
                    <label key={time} className="horario-item">
                      <input
                        type="checkbox"
                        checked={horariosSelecionados.tarde.includes(time)}
                        onChange={() => toggleHorario("tarde", time)}
                      />
                      {time}
                    </label>
                  ))}
                </div>
              </div>

              <div className="horario-periodo">
                <h4>Noite</h4>
                <div className="horarios-lista">
                  {timeSlots.slice(12).map((time) => (
                    <label key={time} className="horario-item">
                      <input
                        type="checkbox"
                        checked={horariosSelecionados.noite.includes(time)}
                        onChange={() => toggleHorario("noite", time)}
                      />
                      {time}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-cancelar" onClick={() => setStep(1)} disabled={loading}>
                ← Voltar
              </button>
              <button className="btn-salvar" onClick={handleSave} disabled={loading}>
                {loading ? "Salvando..." : "Salvar Técnico"}
              </button>
            </div>
          </>
        )}

        {/* Mensagem de feedback */}
        {message && (
          <p
            style={{
              marginTop: "12px",
              textAlign: "center",
              color: message.includes("sucesso") ? "green" : "red",
              fontWeight: "500",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
};

export default TecnicosNovo;