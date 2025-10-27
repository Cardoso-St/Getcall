import jwt from 'jsonwebtoken';

// Middleware de autenticação JWT
export const authMiddleware = (roles = []) => async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.cliente = decoded;
        if (roles.length && !roles.includes(req.cliente.role)) {
            return res.status(403).json({ error: 'Permissão insuficiente.' });
        }
        next();
    } catch (err) {
        res.status(400).json({ error: 'Token inválido.' });
    }
};