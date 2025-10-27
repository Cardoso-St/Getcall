import jwt from 'jsonwebtoken';
import  Cliente from '../models/ClienteModel.js'; // Ajuste o caminho conforme necessário

export const verifyToken = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ error: 'Token não fornecido' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const cliente = await Cliente.findOne({ where: { email: decoded.email } });

        if (!cliente) return res.status(401).json({ error: 'Usuário não encontrado' });

        res.json({ cliente: { email: cliente.email, role: cliente.role } });
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};