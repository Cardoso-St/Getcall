import app from "./app.js";
import { conn } from "./config/sequelize.js";

const PORT = 5000;

// Sincroniza banco e inicia servidor
conn.sync()
    .then(() => {
        console.log("Banco de dados conectado 🍆");
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error("Erro ao conectar ao banco:", error));
