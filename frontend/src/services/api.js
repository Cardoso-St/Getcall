// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Token automático
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redireciona se token inválido
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
const atualizarStatus = async (novoStatus) => {
  try {
    const res = await api.put(`/chamados/${id}`, { status: novoStatus });
    setChamado(res.data.chamado || res.data);
  } catch (err) {
    alert(err.response?.data?.error || "Erro ao atualizar status");
  }
};

export default api;