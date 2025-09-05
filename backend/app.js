import express from "express";
import cors from "cors";
import { conn } from "./config/sequelize.js";


const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json())

conn.sync()
.then(() => {
    console.log("Banco de dados conectado🍆")
})
.catch((error) => console.log(error))


export default app;