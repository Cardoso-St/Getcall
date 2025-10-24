import React, { useState } from 'react';
import '../css/Perfil.css';

export default function Perfil() {
  const [perfil, setPerfil] = useState({
    nome: 'André Costa',
    email: 'andre.costa@client.com',
    senha: '********',
  });

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [modalSenhaAberta, setModalSenhaAberta] = useState(false);

  const handlePerfilChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const abrirModalSenha = () => setModalSenhaAberta(true);
  const fecharModalSenha = () => setModalSenhaAberta(false);

  const alterarSenha = (e) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      alert('A nova senha e a confirmação não coincidem!');
      return;
    }
    // Aqui você faria a lógica de validação e atualização da senha
    alert('Senha alterada com sucesso!');
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarSenha('');
    fecharModalSenha();
  };

  const salvarPerfil = (e) => {
    e.preventDefault();
    // Aqui você faria a lógica para salvar as alterações do perfil
    alert('Perfil salvo com sucesso!');
  };

  return (
    <div className="perfil-container">

      <div className="perfil-box">
        <h2>Perfil</h2>
        <hr className='sub' />
        <form onSubmit={salvarPerfil}>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={perfil.nome}
            onChange={handlePerfilChange}
          />

          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={perfil.email}
            onChange={handlePerfilChange}
          />

          <label>Senha</label>
          <div className="senha-container">
            <input
              type="password"
              value={perfil.senha}
              readOnly
            />
            <button type="button" className="btn-alterar-senha" onClick={abrirModalSenha}>
              Alterar
            </button>
          </div>

          <button type="submit" className="btn-salvar">Salvar</button>
        </form>
      </div>

      {modalSenhaAberta && (
        <div className="modal-senha-overlay">
          <div className="modal-senha">
            <h3>Alterar senha</h3>
            <form onSubmit={alterarSenha}>
              <label>Senha atual</label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                required
              />

              <label>Nova senha</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
                minLength={6}
              />

              <label>Confirme a nova senha</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                minLength={6}
              />

              <div className="modal-buttons">
                <button type="submit" className="btn-salvar">Salvar</button>
                <button type="button" className="btn-cancelar" onClick={fecharModalSenha}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>                 
  );
}
