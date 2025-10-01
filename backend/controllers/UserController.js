import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: "E-mail já cadastrado" });
        }

        const hashedSenha = await bcrypt.hash(senha, 10);
        const user = await User.create({ email, senha: hashedSenha });

        return res.status(201).json({ message: "Usuário cadastrado com sucesso", id: user.id });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao registrar usuário" });
    }
};
export const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const match = await bcrypt.compare(senha, user.senha);
        if (!match) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        return res.status(200).json({ message: "Login realizado com sucesso", userId: user.id });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao realizar login" });
    }
};
export const listarUsuarios = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ["id", "email"] }); // não retorna senha
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao listar usuários" });
    }
};

