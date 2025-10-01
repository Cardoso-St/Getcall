import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

export const User = conn.define(
    "User", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
