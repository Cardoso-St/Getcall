import React from "react";
import { useNavigate } from "react-router-dom";
import '../../../css/admin/clientes/NovoCliente.css';

const ClienteNovo = () => {
  const navigate = useNavigate();

  const handleCancel = () => navigate(-1);
  const handleSave = () => alert("Cliente salvo com sucesso! (mock)");

  return (
    <main className="cliente-novo-container">
      <button className="voltarBotaoTeste" onClick={handleCancel}>← Voltar</button>
      <h2 className="titulo">Perfil de clientes</h2>

      <div className="cliente-form-card">
        <section className="form-header">
          <h3>Dados pessoais</h3>
          <p>Defina as informações do perfil de cliente</p>
        </section>

        <form className="cliente-form">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input id="nome" type="text" placeholder="Nome completo" />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="exemplo@mail.com" />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" placeholder="Defina a senha de acesso" />
            <small>Mínimo de 6 dígitos</small>
          </div>
        </form>

        <div className="form-actions">
          <button className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
          <button className="btn-salvar" onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </main>
  );
};

export default ClienteNovo;
