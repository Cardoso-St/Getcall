import express from 'express';
import { login, listarClientes, criarCliente } from '../controllers/ClienteController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', login);
router.post('/create-cliente', authMiddleware(['admin']), criarCliente);
router.get('/list-clientes', authMiddleware(['admin']), listarClientes);
router.get('/verify-token', verifyToken)
export default router;