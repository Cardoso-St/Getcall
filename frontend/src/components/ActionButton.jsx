import React from "react";

// Exemplo de ícones importados
import { FaTrash, FaEdit } from "react-icons/fa";

const icons = {
  edit: <FaEdit />,
  delete: <FaTrash />,
};

const ActionButton = ({ type, title, onClick }) => {
  return (
    <button
      className={`btn-acao btn-${type}`} // classe dinâmica
      title={title}
      onClick={onClick}
    >
      {icons[type]}
    </button>
  );
};

export default ActionButton;
