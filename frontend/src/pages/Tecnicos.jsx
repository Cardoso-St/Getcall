import React from 'react';
import '../css/Tecnicos.css'; // Crie esse arquivo para os estilos
import PageHeader from '../components/PageHeader';

const Tecnicos = () => {
  // Dados mockados baseados na imagem (substitua por dados reais de API)
  const todosTecnicos = [
    { id: 1, nome: 'Carlos Silva', email: 'carlos.silva@test.com', disponibilidade: '08:00 09:00 10:00 11:00 -4' },
  ];

  return (
    <div className="tecnicos-container">
      {/* Cabeçalho */}
      <PageHeader title="Técnicos" onNewClick={() => alert('BOTAO PARA ADICIONAR TECNICO FUNCIONANDO PAPAI')} />
      {/* Tabela principal */}
      <table className="tecnicos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Disponibilidade</th>
          </tr>
        </thead>
        <tbody>
          {todosTecnicos.map((tecnico) => (
            <tr key={tecnico.id}>
              <td>
                <span className="avatar">{tecnico.nome.charAt(0)}</span> {tecnico.nome}
              </td>
              <td>{tecnico.email}</td>
              <td>{tecnico.disponibilidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tecnicos;