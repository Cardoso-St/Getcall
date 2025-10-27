import jwt from 'jsonwebtoken';
import Cliente from '../models/ClienteModel.js';
import {verifyToken} from '../middleware/verifyToken.js'


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

        const cliente = await Cliente.findOne({ where: { email } });
        if (!cliente) {
            console.log('Cliente não encontrado:', email);
            return res.status(400).json({ error: 'E-mail ou senha inválidos.' });
        }

        console.log('Cliente encontrado:', { id: cliente.id, email: cliente.email, role: cliente.role });

        const verificaSenhaValida = await cliente.comparePassword(senha);

        if (!verificaSenhaValida) {
            console.log('Senha inválida para:', email);
            return res.status(400).json({ error: 'E-mail ou senha inválidos.' });
        }

        const token = jwt.sign(
            { clienteId: cliente.id, email: cliente.email, role: cliente.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Token gerado:', token);
        res.json({ token, cliente: { email: cliente.email, role: cliente.role } });

    } catch (err) {
        console.error('Erro no login:', err.message); // Log apenas a mensagem
        res.status(500).json({ error: 'Erro interno no servidor' }); // Resposta genérica
    }
};

// Criar cliente (apenas o admin pode criar)
export const criarCliente = async (req, res) => {
    const { nome, email, senha, role } = req.body;
    try {
        console.log('Tentativa de criar cliente:', { email, role });

        if ( !nome || !email || !senha ) {
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
        }

        const emailExistente = await Cliente.findOne({ where: { email } });
        if (emailExistente)
            return res.status(400).json({ error: 'E-mail já cadastrado.' });

        const newCliente = await Cliente.create({nome, email, senha, role: role || 'cliente' });
        res.status(201).json({ message: 'cliente criado com sucesso.', cliente: { nome, email, role } });

    } catch (err) {
        console.error('Erro ao criar cliente:', err);
        res.status(500).json({ error: 'Erro no servidor.' });
    }
};

// Listar Clientes (apenas admin)
export const listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            attributes: ['id', 'nome', 'email', 'role', 'createdAt'],
        });
        res.json(clientes);
    } catch (err) {
        console.error('Erro ao listar Clientes:', err);
        res.status(500).json({ error: 'Erro no servidor.' });
    }
};