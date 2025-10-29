import { DataTypes, UUIDV4 } from 'sequelize';
import bcrypt from 'bcryptjs';
import { conn } from '../config/sequelize.js';

const Tecnico = conn.define('Tecnico', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    formacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especialidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horarioDeAtendimento: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: ["08:00"] // ex: ["08:00", "14:00", "19:00"]
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}
);

// Hash de senha antes de salvar
Cliente.beforeCreate(async (cliente) => {
    cliente.senha = await bcrypt.hash(cliente.senha, 10);
});

// Método para comparar senha
Cliente.prototype.comparePassword = async function (senha) {
    return bcrypt.compare(senha, this.senha);
};

export default Cliente;