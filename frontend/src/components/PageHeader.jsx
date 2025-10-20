// src/components/PageHeader.jsx
import React from 'react';
import "../css/PageHeader.css";

const PageHeader = ({ title, onNewClick }) => {
  return (
    <div className="page-header">
      <h2>{title}</h2>
      {onNewClick && (  // 👈 só renderiza se houver função
        <button className="novo-btn" onClick={onNewClick}>
          + Novo
        </button>
      )}
    </div>
  );
};

export default PageHeader;
