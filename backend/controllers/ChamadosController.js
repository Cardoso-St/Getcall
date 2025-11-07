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
    return res.status(400).json({ error: "ID inválido." });
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

export const editarChamados = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, categoria, status, cliente_id } = req.body;

  try {
    // ⚠️ Verifica se o ID foi enviado
    if (!id) {
      return res.status(400).json({ error: "ID do chamado não fornecido." });
    }

    // 🔍 Verifica se o chamado existe
    const chamado = await ChamadoModel.findByPk(id);
    if (!chamado) {
      return res.status(404).json({ error: "Chamado não encontrado." });
    }

    // 🔎 Se o cliente foi alterado, verifica se o novo cliente existe
    if (cliente_id) {
      const clienteExistente = await ClienteModel.findByPk(cliente_id);
      if (!clienteExistente) {
        return res.status(404).json({ error: "Cliente informado não existe." });
      }
    }

    // ✏️ Atualiza os dados (somente campos enviados)
    await chamado.update({
      nome: nome ?? chamado.nome,
      descricao: descricao ?? chamado.descricao,
      categoria: categoria ?? chamado.categoria,
      status: status ?? chamado.status,
      cliente_id: cliente_id ?? chamado.cliente_id,
    });

    // 🔗 Busca novamente com o relacionamento do cliente
    const chamadoAtualizado = await ChamadoModel.findByPk(chamado.id, {
      include: {
        model: ClienteModel,
        as: "cliente",
        attributes: ["id", "nome", "email"],
      },
    });

    res.status(200).json({
      message: "Chamado atualizado com sucesso.",
      chamado: chamadoAtualizado,
    });
  } catch (error) {
    console.error("Erro ao editar chamado:", error);
    res.status(500).json({ error: "Erro no servidor ao editar chamado." });
  }
};

export const deletarChamado = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const chamado = await ChamadoModel.findByPk(id);

    if (!chamado) {
      return res.status(404).json({ error: "Chamado não encontrado." });
    }

    await chamado.destroy(); // 🔥 Deleta o chamado do banco

    res.status(200).json({ message: "Chamado deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar chamado:", error);
    res.status(500).json({ error: "Erro ao deletar o chamado." });
  }
};
