import React from "react";
import "../css/DataTable.css";

const DataTable = ({ columns = [], data = [], rowKey = "id", onRowClick, renderActions }) => {
  // função para acessar propriedades aninhadas (ex: "cliente.nome")
  const getValue = (obj, accessor) => {
    if (!accessor) return "";
    return accessor.split(".").reduce((acc, key) => (acc ? acc[key] : ""), obj);
  };

  return (
    <div className="datatable-container">
      <table className="datatable">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.header}</th>
            ))}
            {renderActions && <th>Ações</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => {
            const key = typeof rowKey === "function" ? rowKey(row) : row[rowKey] ?? index;

            return (
              <tr
                key={key}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "clickable" : ""}
              >
                {columns.map((col, i) => (
                  <td key={i}>
                    {col.render ? col.render(row) : getValue(row, col.accessor)}
                  </td>
                ))}

                {renderActions && <td>{renderActions(row)}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
