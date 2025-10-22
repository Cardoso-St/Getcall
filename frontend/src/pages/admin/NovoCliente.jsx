import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import '../../css/admin/NovoCliente.css';

const NovoCliente = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', senha: '', role: 'user' });
  const [message, setMessage] = useState('');

  const handleCancel = () => navigate(-1);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/users/create-user',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('✅ Cliente salvo com sucesso!');
      setTimeout(() => navigate('/app/clientes'), 1000);
    } catch (err) {
      setMessage(`❌ ${err.response.data.error}`);
    }
  };

  if (user?.role !== 'admin') return <p>Acesso negado.</p>;

  return (
    <main className="cliente-novo-container">
      <button className="voltarBotaoTeste" onClick={handleCancel}>← Voltar</button>
      <h2 className="titulo">Perfil de clientes</h2>

      <div className="cliente-form-card">
        <section className="form-header">
          <h3>Dados pessoais</h3>
          <p>Defina as informações do perfil de cliente</p>
        </section>

        <form className="cliente-form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="exemplo@mail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Defina a senha de acesso"
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              required
            />
            <small>Mínimo de 6 dígitos</small>
          </div>

          <div className="form-group">
            <label htmlFor="role">Função</label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="user">Usuário</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
            <button type="submit" className="btn-salvar">Salvar</button>
          </div>
        </form>
        {message && (
          <p style={{ marginTop: '10px', color: message.includes('✅') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
};

export default NovoCliente;