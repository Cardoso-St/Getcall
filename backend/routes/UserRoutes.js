import express from 'express';
import { login, listarUsuarios, criarUsuario } from '../controllers/UserController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', login);
router.post('/create-user', authMiddleware(['admin']), criarUsuario);
router.get('/list-users', authMiddleware(['admin']), listarUsuarios);
router.get('/verify-token', verifyToken)
export default router;