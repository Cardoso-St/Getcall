import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

// Middleware de autenticação JWT
export const authMiddleware = (roles = []) => async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permissão insuficiente.' });
    }
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token)
    return res.status(401).json({ error: 'Token não fornecido' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) 
    return res.status(401).json({ error: 'Usuário não encontrado' });

    res.json({ user: { email: user.email, role: user.role } });
  
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Login COM JWT
export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    console.log('Tentativa de login:', { email });
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    if (!email || !senha) {
      console.log('Faltando email ou senha:', { email, senha });
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Usuário não encontrado:', email);
      return res.status(400).json({ error: 'E-mail ou senha inválidos.' });
    }

    console.log('Usuário encontrado:', { id: user.id, email: user.email, role: user.role });
    
    const verificaSenhaValida = await user.comparePassword(senha);

    if (!verificaSenhaValida) {
      console.log('Senha inválida para:', email);
      return res.status(400).json({ error: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    console.log('Token gerado:', token);  
    res.json({ token, user: { email: user.email, role: user.role } });
  
  } catch (err) {
    console.error('Erro no login:', err.message); // Log apenas a mensagem
    res.status(500).json({ error: 'Erro interno no servidor' }); // Resposta genérica
  }
};

// Criar usuário (apenas o admin pode criar)
export const criarUsuario = async (req, res) => {
  const { email, senha, role } = req.body;
  try {
    console.log('Tentativa de criar usuário:', { email, role });

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }
    
    const emailExistente = await User.findOne({ where: { email } });
    if (emailExistente) 
    return res.status(400).json({ error: 'E-mail já cadastrado.' });

    const newUser = await User.create({ email, senha, role: role || 'user' });
    res.status(201).json({ message: 'Usuário criado com sucesso.', user: { email, role } });
  
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: 'Erro no servidor.' });
  }
};

// Listar usuários (apenas admin)
export const listarUsuarios = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'role', 'createdAt'],
    });
    res.json(users);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ error: 'Erro no servidor.' });
  }
};