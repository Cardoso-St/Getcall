import jwt from "jsonwebtoken";
import Cliente from "../models/ClienteModel.js";

export const verifyToken = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Token não fornecido" });

    // Decodifica o token e obtém o ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Busca o cliente pelo ID que veio do token
    const cliente = await Cliente.findByPk(decoded.clienteId);

    if (!cliente)
      return res.status(401).json({ error: "Cliente não encontrado" });

    // ✅ Retorna dados completos do cliente
    res.json({
      cliente: {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        role: cliente.role,
      },
    });
  } catch (err) {
    console.error("Erro ao verificar token:", err.message);
    res.status(401).json({ error: "Token inválido" });
  }
};
