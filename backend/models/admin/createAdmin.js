// backend/models/admin/createAdmin.js
import { conn } from "../../config/sequelize.js";
import User from "../../UserModel.js";

const createAdmin = async () => {
  try {
    // Sincroniza os modelos com o banco sem apagar dados existentes
    await conn.sync({ alter: true });
    console.log("Banco de dados sincronizado ✅");

    // Verifica se o admin já existe
    const admin = await User.findOne({ where: { email: "admin@test.com" } });

    if (!admin) {
      // Cria o admin apenas se não existir
      await User.create({
        email: "admin@test.com",
        senha: "admin123",
        role: "admin",
      });
      console.log("✅ Admin criado com sucesso!");
    } else {
      console.log("⚙️ Admin já existe, nada foi alterado.");
    }

    process.exit();
  } catch (err) {
    console.error("Erro ao criar admin:", err);
    process.exit(1);
  }
};

createAdmin();
