import jwt from 'jsonwebtoken';
import Cliente from '../models/ClienteModel.js';
import {verifyToken} from '../middleware/verifyToken.js'
import { Op } from 'sequelize'; 
import bcrypt from 'bcryptjs';
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
export const editarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, role } = req.body;

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verificar se o e-mail já está em uso por outro cliente
    const emailExistente = await Cliente.findOne({
      where: { email, id: { [Op.ne]: id } }, // Ignora o próprio cliente
    });
    if (emailExistente) {
      return res.status(400).json({ error: 'E-mail já está em uso' });
    }

    cliente.nome = nome;
    cliente.email = email;
    cliente.role = role || cliente.role; // Mantém o role atual se não fornecido

    // Atualizar a senha apenas se fornecida
    if (senha) {
      const saltRounds = 10;
      cliente.senha = await bcrypt.hash(senha, saltRounds);
    }

    // Salvar as alterações
    await cliente.save();

    console.log('Cliente atualizado:', cliente.toJSON());
    return res.status(200).json({ message: 'Dados do cliente atualizados com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar dados do cliente', error: error.message });
  }
};
export const obterClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Buscando cliente com ID:', id);

    const cliente = await Cliente.findByPk(id, {
      attributes: ['id', 'nome', 'email', 'role', 'createdAt'],
    });

    if (!cliente) {
      console.log('Cliente não encontrado:', id);
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    console.log('Cliente encontrado:', cliente);
    res.json(cliente);
  } catch (err) {
    console.error('Erro ao buscar cliente:', err.message);
    res.status(500).json({ error: 'Erro no servidor.' });
  }
};

export const excluirCliente = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Tentativa de excluir cliente com ID:', id);

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      console.log('Cliente não encontrado:', id);
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    await cliente.destroy();
    console.log('Cliente excluído com sucesso:', id);
    return res.status(200).json({ message: 'Cliente excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error.message);
    return res.status(500).json({ error: 'Erro ao excluir cliente.' });
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