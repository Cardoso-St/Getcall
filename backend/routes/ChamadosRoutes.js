import express from "express";
import {
  criarChamado,
  listarChamados,
} from "../controllers/ChamadosController.js";

const router = express.Router();

// POST /api/chamados → cria um novo chamado
router.post("/", criarChamado);

// GET /api/chamados → lista todos os chamados
router.get("/", listarChamados);

export default router;