// backend/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conn } from "./config/sequelize.js";

// 🧩 Modelos
import Cliente from "./models/ClienteModel.js";
import Chamado from "./models/ChamadosModel.js";

// 🔌 Rotas
import ClientesRoutes from "./routes/ClientesRoutes.js";
import ChamadosRoutes from "./routes/ChamadosRoutes.js";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// ✅ Rotas
app.use("/api/clientes", ClientesRoutes);
app.use("/api/chamados", ChamadosRoutes);

// 🚀 Conecta e sincroniza o banco
const connectDB = async () => {
  try {
    console.log("🔄 Conectando ao banco...");
    await conn.authenticate();
    console.log("✅ Conectado com sucesso.");

    // 🔁 Sincroniza todos os modelos
    await conn.sync({ alter: true });
    console.log("📦 Modelos sincronizados com o banco.");

    // 🧑‍💼 Criação automática do admin, se não existir
    const adminExistente = await Cliente.findOne({
      where: { email: "admin@test.com" },
    });

    if (!adminExistente) {
      await Cliente.create({
        nome: "Admin",
        email: "admin@test.com",
        senha: "admin123",
        role: "admin",
      });
      console.log(
        "✅ Admin criado com sucesso (email: admin@test.com / senha: admin123)"
      );
    } else {
      console.log("⚙️ Admin já existe, nada foi alterado.");
    }
  } catch (error) {
    console.error("❌ Erro ao conectar ou sincronizar banco:", error);
  }
};

connectDB();

export default app;
