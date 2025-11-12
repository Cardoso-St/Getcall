// models/index.js (ou onde estão os relacionamentos)
import ClienteModel from "./ClienteModel.js";
import ChamadoModel from "./ChamadosModel.js";
import TecnicoModel from "./TecnicosModel.js";

// Relacionamentos
ClienteModel.hasMany(ChamadoModel, {
  foreignKey: "cliente_id",
  as: "chamados",
});

TecnicoModel.hasMany(ChamadoModel, {
  foreignKey: "tecnico_id",
  as: "chamadosAtribuidos",
});

ChamadoModel.belongsTo(ClienteModel, {
  foreignKey: "cliente_id",
  as: "cliente",
});

// ADICIONE ESTE:
ChamadoModel.belongsTo(TecnicoModel, {
  foreignKey: "tecnico_id",
  as: "tecnico",
});

export { ClienteModel, ChamadoModel, TecnicoModel };