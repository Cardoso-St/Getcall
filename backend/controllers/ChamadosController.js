import { ChamadoModel, ClienteModel } from "../models/Relacionamentos.js";

/**
 * Criar um novo chamado
 * (Clientes abrem chamados, e o retorno inclui os dados do cliente)
 */
export const criarChamado = async (req, res) => {
  const { nome, descricao, categoria, status, cliente_id } = req.body;

  try {
    // 🔍 Verifica campos obrigatórios
    if (!nome || !descricao || !categoria || !cliente_id) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    // 🔎 Verifica se o cliente existe
    const clienteExistente = await ClienteModel.findByPk(cliente_id);
    if (!clienteExistente) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    // 🆕 Cria o chamado
    const novoChamado = await ChamadoModel.create({
      nome,
      descricao,
      categoria,
      status: status || "Aberto",
      cliente_id,
    });

    // 🔗 Busca o chamado novamente, agora com o relacionamento do cliente incluso
    const chamadoComCliente = await ChamadoModel.findByPk(novoChamado.id, {
      include: {
        model: ClienteModel,
        as: "cliente",
        attributes: ["id", "nome", "email"], // mostra apenas esses campos
      },
    });

    res.status(201).json({
      message: "Chamado criado com sucesso.",
      chamado: chamadoComCliente,
    });
  } catch (err) {
    console.error("Erro ao criar chamado:", err);
    res.status(500).json({ error: "Erro no servidor ao criar o chamado." });
  }
};

/**
 * Listar todos os chamados com seus respectivos clientes
 */
export const listarChamados = async (req, res) => {
  try {
    const chamados = await ChamadoModel.findAll({
      include: {
        model: ClienteModel,
        as: "cliente",
        attributes: ["id", "nome", "email"],
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(chamados);
  } catch (err) {
    console.error("Erro ao listar chamados:", err);
    res.status(500).json({ error: "Erro no servidor ao listar chamados." });
  }
};

export const listaChamadoPorId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "ID inválido." });
  }
  
  try {
    const chamado = await ChamadoModel.findByPk(id, {
      include: {
        model: ClienteModel,
        as: "cliente",
        attributes: ["id", "nome", "email"],
      },
    });

    if (!chamado) {
      return res.status(404).json({ error: "Chamado não encontrado" });
    }

    res.status(200).json(chamado);
  } catch (error) {
    console.error("Erro ao buscar chamado por ID:", error);
    res.status(500).json({ error: "Erro ao buscar o chamado" });
  }
};
