// src/components/EditProfileModal.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../css/EditOwnProfileDrawer.css';

const EditOwnProfileDrawer = ({ isOpen, onClose, clienteLogado }) => {
  const { updateCliente } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nome: clienteLogado?.nome || '',
    email: clienteLogado?.email || '',
    telefone: clienteLogado?.telefone || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        'http://localhost:5000/api/auth/atualizar-perfil',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateCliente(res.data.cliente);
      alert('Perfil atualizado!');
      onClose();
    } catch (err) {
      alert('Erro ao salvar');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header">
          <div className="modal-avatar">
            {formData.email.charAt(0).toUpperCase()}
          </div>
          <h2>Editar Perfil</h2>
          <p>{formData.email}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome completo</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Telefone</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOwnProfileDrawer;