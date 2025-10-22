// backend/models/UserModel.js
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { conn } from '../config/sequelize.js';

const User = conn.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Hash de senha antes de salvar
User.beforeCreate(async (user) => {
  user.senha = await bcrypt.hash(user.senha, 10);
});

// Método para comparar senha
User.prototype.comparePassword = async function (senha) {
  return bcrypt.compare(senha, this.senha);
};

export default User;