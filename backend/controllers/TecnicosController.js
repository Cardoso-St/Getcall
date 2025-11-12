import jwt from "jsonwebtoken";
import Tecnico from "../models/TecnicosModel.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

// Login de Técnico
export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    console.log("Tentativa de login (Técnico):", { email });

    if (!email || !senha) {
      return res
        .status(400)
        .json({ error: "E-mail e senha são obrigatórios." });
    }

    const tecnico = await Tecnico.findOne({ where: { email } });
    if (!tecnico) {
      return res.status(400).json({ error: "E-mail ou senha inválidos." });
    }

    const verificaSenhaValida = await tecnico.comparePassword(senha);
    if (!verificaSenhaValida) {
      return res.status(400).json({ error: "E-mail ou senha inválidos." });
    }

    const token = jwt.sign(
      { tecnicoId: tecnico.id, email: tecnico.email, role: tecnico.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("Token gerado com sucesso para técnico:", tecnico.email);

    res.json({
      token,
      tecnico: {
        id: tecnico.id,
        nome: tecnico.nome,
        email: tecnico.email,
        role: tecnico.role,
      },
    });
  } catch (err) {
    console.error("Erro no login (Técnico):", err.message);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

// Criar Técnico (apenas admin)
export const criarTecnico = async (req, res) => {
  const { nome, email, senha, telefone, formacao, especialidade, horarioDeAtendimento, role } = req.body;

  try {
    console.log("Técnico:", { email, role });

    if (!nome || !email || !senha || !telefone || !formacao || !especialidade) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const emailExistente = await Tecnico.findOne({ where: { email } });
    if (emailExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const newTecnico = await Tecnico.create({
      nome,
      email,
      senha,
      telefone,
      formacao,
      especialidade,
      horarioDeAtendimento: horarioDeAtendimento || { manha: [], tarde: [], noite: [] },
      role: role || "tecnico",
    });

    res.status(201).json({
      message: "Técnico criado com sucesso.",
      tecnico: {
        nome: newTecnico.nome,
        email: newTecnico.email,
        role: newTecnico.role,
      },
    });
  } catch (err) {
    console.error("Erro ao criar técnico:", err);
    res.status(500).json({ error: "Erro no servidor." });
  }
};

// Editar Técnico (apenas admin)
export const editarTecnico = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, telefone, formacao, especialidade, horarioDeAtendimento, role } = req.body;

    const tecnico = await Tecnico.findByPk(id);
    if (!tecnico) {
      return res.status(404).json({ error: "Técnico não encontrado" });
    }

    // Verificar e-mail duplicado
    const emailExistente = await Tecnico.findOne({
      where: { email, id: { [Op.ne]: id } },
    });
    if (emailExistente) {
      return res.status(400).json({ error: "E-mail já está em uso" });
    }

    // Atualizar campos
    tecnico.nome = nome || tecnico.nome;
    tecnico.email = email || tecnico.email;
    tecnico.telefone = telefone || tecnico.telefone;
    tecnico.formacao = formacao || tecnico.formacao;
    tecnico.especialidade = especialidade || tecnico.especialidade;
    tecnico.horarioDeAtendimento = horarioDeAtendimento || tecnico.horarioDeAtendimento;
    tecnico.role = role || tecnico.role;

    if (senha) {
      tecnico.senha = await bcrypt.hash(senha, 10);
    }

    await tecnico.save();

    console.log("Técnico atualizado:", tecnico.email);
    return res.status(200).json({ message: "Dados do técnico atualizados com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar técnico:", error.message);
    res.status(500).json({ error: "Erro ao atualizar dados do técnico" });
  }
};

// Obter Técnico por ID
export const obterTecnicoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Buscando técnico com ID:", id);

    const tecnico = await Tecnico.findByPk(id, {
      attributes: ["id", "nome", "email", "telefone", "formacao", "especialidade", "horarioDeAtendimento", "role", "createdAt"],
    });

    if (!tecnico) {
      console.log("Técnico não encontrado:", id);
      return res.status(404).json({ error: "Técnico não encontrado." });
    }

    console.log("Técnico encontrado:", tecnico.email);
    res.json({tecnico});
  } catch (err) {
    console.error("Erro ao buscar técnico:", err.message);
    res.status(500).json({ error: "Erro no servidor." });
  }
};

// Excluir Técnico (apenas admin)
export const excluirTecnico = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Tentativa de excluir técnico com ID:", id);

    const tecnico = await Tecnico.findByPk(id);
    if (!tecnico) {
      console.log("Técnico não encontrado:", id);
      return res.status(404).json({ error: "Técnico não encontrado." });
    }

    await tecnico.destroy();
    console.log("Técnico excluído com sucesso:", id);
    return res.status(200).json({ message: "Técnico excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir técnico:", error.message);
    return res.status(500).json({ error: "Erro ao excluir técnico." });
  }
};

// Listar Técnicos (apenas admin)
export const listarTecnicos = async (req, res) => {
  try {
    const tecnicos = await Tecnico.findAll({
      attributes: ["id", "nome", "email", "telefone", "formacao", "especialidade", "role", "createdAt"],
    });
    res.json(tecnicos);
  } catch (err) {
    console.error("Erro ao listar técnicos:", err);
    res.status(500).json({ error: "Erro no servidor." });
  }
};