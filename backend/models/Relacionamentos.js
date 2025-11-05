// src/models/index.js
import ClienteModel from "./ChamadosModel.js";
import ChamadoModel from "./ChamadoModel.js";

// Relacionamentos
ClienteModel.hasMany(ChamadoModel, {
  foreignKey: "cliente_id",
  as: "chamados",
});

ChamadoModel.belongsTo(ClienteModel, {
  foreignKey: "cliente_id",
  as: "cliente",
});

export { ClienteModel, ChamadoModel };
