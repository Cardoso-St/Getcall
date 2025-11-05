import { DataTypes, UUIDV4 } from 'sequelize';
import bcrypt from 'bcryptjs';
import { conn } from '../config/sequelize.js';

const Cliente = conn.define('Cliente', {
    id:{
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true        
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
                isEmail: true
            }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'cliente', 'tecnico'),
        defaultValue: 'cliente',
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