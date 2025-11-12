import express from "express";
import {
  login,
  criarTecnico,
  editarTecnico,
  obterTecnicoPorId,
  excluirTecnico,
  listarTecnicos,
} from "../controllers/TecnicosController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Login (público)
router.post("/login", login);

// CRUD protegido (apenas admin)
router.post("/", authMiddleware(["admin"]), criarTecnico);
router.put("/:id", authMiddleware(["admin"]), editarTecnico);
router.get("/:id", authMiddleware(["admin", "tecnico"]), obterTecnicoPorId);
router.delete("/:id", authMiddleware(["admin"]), excluirTecnico);
router.get("/", authMiddleware(["admin"]), listarTecnicos);
router.post('/verify-token', authMiddleware, (req, res) => {
  res.json({ usuario: req.user }); // req.user vem do middleware
});
export default router;