import express from "express";
import {
  criarChamado,
  listarChamados,
  listaChamadoPorId,
  editarChamados,
  deletarChamado
} from "../controllers/ChamadosController.js";

const router = express.Router();

// POST /api/chamados → cria um novo chamado
router.post("/", criarChamado);

// GET /api/chamados → lista todos os chamados
router.get("/", listarChamados);

// GET /api/chamados → Buscar o chamado
router.get("/:id", listaChamadoPorId);

// PUT /api/chamados → Editar o chamado
router.put("/:id", editarChamados);

// DELETE /api/chamados → Deletar o chamado
router.delete("/:id", deletarChamado);

export default router;