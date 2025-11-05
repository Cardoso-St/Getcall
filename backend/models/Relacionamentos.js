import ClienteModel from "./ClienteModel.js";
import ChamadoModel from "./ChamadosModel.js";

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
