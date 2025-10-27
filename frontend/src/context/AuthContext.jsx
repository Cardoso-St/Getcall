import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:5000/api/clientes/verify-token', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setCliente(res.data.cliente);
                    setLoading(false);
                })
                .catch((err) => {
                    localStorage.removeItem('token');
                    setLoading(false);
                    navigate('/login');
                });
        } else {
            setLoading(false);
        }
    }, [navigate]);

    const login = async (email, senha) => {
        setError(null);
        try {
            const res = await axios.post('http://localhost:5000/api/clientes/login', { email, senha });
            localStorage.setItem('token', res.data.token);
            setCliente(res.data.cliente);
            navigate('/app/clientes');
            return { success: true };
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Erro ao fazer login';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCliente(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ cliente, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};