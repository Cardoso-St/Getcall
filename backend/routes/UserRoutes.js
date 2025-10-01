import express from "express";
import { registerUser, loginUser, listarUsuarios } from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", listarUsuarios);

export default router;
