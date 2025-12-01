// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/verify-token')
        .then(res => {
          setCliente(res.data.cliente || res.data.tecnico);
        })
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/login');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [navigate]); // ← CORRIGIDO AQUI

  const login = async (email, senha) => {
    try {
      const res = await api.post('/clientes/login', { email, senha });
      localStorage.setItem('token', res.data.token);
      setCliente(res.data.cliente);
      navigate('/app/chamados', { replace: true });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error;

      if (errorMsg === "E-mail ou senha inválidos.") {
        try {
          const res = await api.post('/tecnicos/login', { email, senha });
          localStorage.setItem('token', res.data.token);
          setCliente(res.data.tecnico);
          navigate('/app/tecnicos/chamados', { replace: true });
          return { success: true };
        } catch (err2) {
          return { success: false, error: err2.response?.data?.error || 'Credenciais inválidas' };
        }
      } else {
        return { success: false, error: errorMsg || 'Erro ao fazer login' };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCliente(null);
    navigate('/login');
  };

  const updateCliente = (dadosAtualizados) => {
    setCliente(dadosAtualizados);
  };

  return (
    <AuthContext.Provider value={{
      cliente,
      login,
      logout,
      loading,
      updateCliente
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;