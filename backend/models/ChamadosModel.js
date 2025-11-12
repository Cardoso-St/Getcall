// src/models/ChamadoModel.js
import { DataTypes, UUIDV4 } from "sequelize";
import { conn } from "../config/sequelize.js";
import ClienteModel from "./ClienteModel.js";

const Chamados = conn.define("Chamados", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM(
      "Rede",
      "Hardware",
      "Software",
      "Suporte Técnico",
      "Acesso ao Sistema",
      "Backup",
      "Impressora",
      "Segurança da Informação",
      "Infraestrutura",
      "Outro"
    ),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Aberto", "Em atendimento", "Encerrado"),
    defaultValue: "Aberto",
  },
  cliente_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ClienteModel,
      key: "id",
    },
  },
  tecnico_id: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: 'Tecnicos',
    key: 'id'
  }
},
  // Caso queira ativar o relacionamento com técnicos futuramente
  // tecnico_id: {
  //   type: DataTypes.UUID,
  //   references: {
  //     model: TecnicoModel,
  //     key: "id",
  //   },
  // },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Chamados;
