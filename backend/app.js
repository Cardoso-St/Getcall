import express from "express";
import cors from "cors";
import { conn } from "./config/sequelize.js";
import userRoutes from "./routes/UserRoutes.js";

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());
app.use("/api/users", userRoutes);

export default app;
