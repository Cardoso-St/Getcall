import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

const Chamados = conn.define("Chamados", {
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
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Chamados;
