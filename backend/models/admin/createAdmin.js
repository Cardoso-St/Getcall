// backend/createAdmin.js
import { conn } from '../../config/sequelize.js';
import User from '../UserModel.js'; // Ajustado para UserModel.js

const createAdmin = async () => {
  try {
    await conn.sync({ force: true }); // Recria a tabela (cuidado: apaga dados existentes)
    await User.create({
      email: 'admin@test.com',
      senha: 'admin123',
      role: 'admin',
    });
    console.log('Admin criado!');
    process.exit();
  } catch (err) {
    console.error('Erro:', err);
    process.exit(1);
  }
};

createAdmin();