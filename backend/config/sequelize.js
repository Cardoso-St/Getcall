import { Sequelize } from "sequelize";

// Conexão SQLite
export const conn = new Sequelize({
    dialect: "sqlite",
    storage: "./database/database.sqlite",
    logging: false,
});
