import express from 'express';
import { login, authMiddleware, verifyToken, listarUsuarios, criarUsuario } from '../controllers/UserController.js';

const router = express.Router();

router.post('/login', login);
router.post('/create-user', authMiddleware(['admin']), criarUsuario);
router.get('/list-users', authMiddleware(['admin']), listarUsuarios);
router.get('/verify-token', verifyToken)
export default router;