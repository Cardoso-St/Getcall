// backend/app.js
import express from "express";
import cors from "cors";
import { conn } from "./config/sequelize.js";
import dotenv from "dotenv";

//Importando Rotas
import ClientesRoutes from "./routes/ClientesRoutes.js";
import ChamadosRoutes from "./routes/ChamadosRoutes.js";

dotenv.config();

const app = express();

// 🔧 Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// 🔌 Rotas
app.use("/api/clientes", ClientesRoutes);
app.use("/api/chamados", ChamadosRoutes);


// ✅ Conecta ao banco e sincroniza
const connectDB = async () => {
  try {
    await conn.authenticate();
    console.log("Banco de dados conectado 🍆");
    // 🔁 Sincroniza os modelos com o banco (sem apagar dados)
    await conn.sync({ alter : true });
    console.log("Modelos sincronizados ✅");
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
};

connectDB();

export default app;
