import { DataTypes, UUIDV4 } from 'sequelize';
import bcrypt from 'bcryptjs';
import { conn } from '../config/sequelize.js';

const Tecnico = conn.define('Tecnico', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
        validate: { isEmail: true }
    },
    senha: { type: DataTypes.STRING, allowNull: false },
    telefone: { type: DataTypes.STRING, allowNull: false },
    formacao: { type: DataTypes.STRING, allowNull: false },
    especialidade: { type: DataTypes.STRING, allowNull: false },

    horarioDeAtendimento: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: { manha: [], tarde: [], noite: [] },
        validate: {
            isValidStructure(value) {
                if (!value || typeof value !== 'object') {
                    throw new Error('horarioDeAtendimento deve ser um objeto');
                }
                const periodos = ['manha', 'tarde', 'noite'];
                for (const p of periodos) {
                    if (!Array.isArray(value[p])) {
                        throw new Error(`'${p}' deve ser uma lista de horários`);
                    }
                }
            }
        }
    },

    role: {
        type: DataTypes.ENUM('admin', 'tecnico'),
        defaultValue: 'tecnico',
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'Tecnicos'
});

// Hash de senha
Tecnico.beforeCreate(async (tecnico) => {
    tecnico.senha = await bcrypt.hash(tecnico.senha, 10);
});

Tecnico.prototype.comparePassword = async function (senha) {
    return bcrypt.compare(senha, this.senha);
};

export default Tecnico;