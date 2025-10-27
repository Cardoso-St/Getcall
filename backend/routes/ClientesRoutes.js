import express from 'express';
import { login, listarClientes, criarCliente, editarCliente, obterClientePorId } from '../controllers/ClienteController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', login);
router.post('/create-cliente', authMiddleware(['admin']), criarCliente);
router.put('/editar/:id', authMiddleware(['admin']), editarCliente);
router.get('/list-clientes', authMiddleware(['admin']), listarClientes);
router.get('/verify-token', verifyToken)
router.get('/:id', authMiddleware(['admin']), obterClientePorId); // Nova rota  
export default router;