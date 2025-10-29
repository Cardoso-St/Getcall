import React, { useState, useEffect } from 'react';
import '../css/Perfil.css';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    nome: 'André Costa',
    email: 'andre.costa@client.com',
    senha: '********',
    imagemUrl: null
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [modalSenhaAberta, setModalSenhaAberta] = useState(false);

  // Geração de preview da imagem selecionada
  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedImage]);

  const handlePerfilChange = (e) => {
    const { name, value } = e.target;
    setPerfil(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPerfil(prev => ({ ...prev, imagemUrl: file }));
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setPerfil(prev => ({ ...prev, imagemUrl: null }));
  };

  const abrirModalSenha = () => setModalSenhaAberta(true);
  const fecharModalSenha = () => setModalSenhaAberta(false);

  const voltarPaginaInicial = () => {
    navigate('/');
  };

  const alterarSenha = (e) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      alert('A nova senha e a confirmação não coincidem!');
      return;
    }
    alert('Senha alterada com sucesso!');
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarSenha('');
    fecharModalSenha();
  };

  const salvarPerfil = (e) => {
    e.preventDefault();
    alert('Perfil salvo com sucesso!');
  };

  return (
    <div className="perfil-container">
      <div className="perfil-box">
        <h2>Perfil</h2>
        <hr className="sub" />

        <form onSubmit={salvarPerfil}>
          <label className='sub1'>Nova imagem de perfil</label>
          <div className="image-upload-container">
            {previewUrl ? (
              <div className="image-preview-box">
                <img src={previewUrl} alt="Preview" className="image-preview" />
                <button
                  type="button"
                  className="btn-remove-image"
                  onClick={handleImageRemove}
                >
                  ✕
                </button>
              </div>
            ) : (
              <input
              className='sub2'
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            )}
          </div>

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
            <button
              type="button"
              className="btn-alterar-senha"
              onClick={abrirModalSenha}
            >
              Alterar
            </button>
          </div>

          <button type="submit" className="btn-salvar">
            Salvar
          </button>
        </form>
      </div>

      {modalSenhaAberta && (
        <div className="modal-senha-overlay">
          <div className="modal-senha">
            <div className="modal-header">
              <span className="icon-voltar" onClick={voltarPaginaInicial}>←</span>
              <span className="icon-fechar" onClick={fecharModalSenha}>✕</span>
            </div>

            <h3>Alterar senha</h3>
            <form onSubmit={alterarSenha}>
              <label>Senha atual</label>
              <input
                type="password"
                value={senhaAtual}
                onChange={e => setSenhaAtual(e.target.value)}
                required
              />

              <label>Nova senha</label>
              <input
                type="password"
                value={novaSenha}
                onChange={e => setNovaSenha(e.target.value)}
                required
                minLength={6}
              />  

              <label>Confirme a nova senha</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={e => setConfirmarSenha(e.target.value)}
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
