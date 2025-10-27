import jwt from 'jsonwebtoken';
import  User  from '../models/UserModel.js'; // Ajuste o caminho conforme necessário

export const verifyToken = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ error: 'Token não fornecido' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

        res.json({ user: { email: user.email, role: user.role } });
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};