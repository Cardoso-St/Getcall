// middleware/verifyToken.js
import jwt from "jsonwebtoken";
import Cliente from "../models/ClienteModel.js";
import Tecnico from "../models/TecnicosModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Token não fornecido" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let usuario = null;

    // 1. Cliente
    if (decoded.clienteId) {
      usuario = await Cliente.findByPk(decoded.clienteId);
    }
    // 2. Técnico
    else if (decoded.tecnicoId) {
      usuario = await Tecnico.findByPk(decoded.tecnicoId);
    }

    if (!usuario) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    // ← MANTÉM req.cliente para compatibilidade
    req.cliente = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role || (decoded.tecnicoId ? "tecnico" : "cliente"),
    };

    next();
  } catch (err) {
    console.error("Token inválido:", err.message);
    res.status(401).json({ error: "Token inválido" });
  }
};