import dotenv from 'dotenv';
import app from './app.js';
import { conn } from './config/sequelize.js';

// Carrega as variáveis de ambiente do .env
dotenv.config();

const PORT = process.env.PORT || 5000;

conn.sync({ force: false })
  .then(() => {
    console.log('Banco de dados conectado 🍆');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('Erro ao conectar ao banco:', error));