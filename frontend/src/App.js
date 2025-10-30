import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '' });
  const [novaTransacao, setNovaTransacao] = useState({ 
    descricao: '', 
    valor: '', 
    tipo: 'Entrada', 
    usuarioId: '' 
  });
  const [editandoUsuario, setEditandoUsuario] = useState(null);

  useEffect(() => {
    carregarUsuarios();
    carregarTransacoes();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuarios:', error);
      alert('Erro ao carregar usuários. Verifique se o backend está rodando.');
    }
  };

  const carregarTransacoes = async () => {
    try {
      const response = await axios.get(`${API_URL}/transacoes`);
      setTransacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar transacoes:', error);
    }
  };

  const adicionarUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/usuarios`, novoUsuario);
      setNovoUsuario({ nome: '', email: '' });
      carregarUsuarios();
      alert('Usuário adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar usuario:', error);
      alert('Erro ao adicionar usuário');
    }
  };

  const editarUsuario = (usuario) => {
    setEditandoUsuario(usuario);
    setNovoUsuario({ nome: usuario.nome, email: usuario.email });
  };

  const atualizarUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/usuarios/${editandoUsuario.id}`, {
        id: editandoUsuario.id,
        ...novoUsuario
      });
      setNovoUsuario({ nome: '', email: '' });
      setEditandoUsuario(null);
      carregarUsuarios();
      alert('Usuário atualizado!');
    } catch (error) {
      console.error('Erro ao atualizar usuario:', error);
      alert('Erro ao atualizar usuário');
    }
  };

  const deletarUsuario = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await axios.delete(`${API_URL}/usuarios/${id}`);
        carregarUsuarios();
        alert('Usuário excluído!');
      } catch (error) {
        console.error('Erro ao deletar usuario:', error);
        alert('Erro ao deletar usuário');
      }
    }
  };

  const cancelarEdicao = () => {
    setEditandoUsuario(null);
    setNovoUsuario({ nome: '', email: '' });
  };

  const adicionarTransacao = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/transacoes`, {
        ...novaTransacao,
        valor: parseFloat(novaTransacao.valor),
        usuarioId: parseInt(novaTransacao.usuarioId)
      });
      setNovaTransacao({ descricao: '', valor: '', tipo: 'Entrada', usuarioId: '' });
      carregarTransacoes();
      alert('Transação adicionada!');
    } catch (error) {
      console.error('Erro ao adicionar transacao:', error);
      alert('Erro ao adicionar transação');
    }
  };

  const deletarTransacao = async (id) => {
    if (window.confirm('Deseja excluir esta transação?')) {
      try {
        await axios.delete(`${API_URL}/transacoes/${id}`);
        carregarTransacoes();
      } catch (error) {
        console.error('Erro ao deletar transacao:', error);
      }
    }
  };

  const calcularTotal = () => {
    let total = 0;
    transacoes.forEach(t => {
      if (t.tipo === 'Entrada') {
        total += t.valor;
      } else {
        total -= t.valor;
      }
    });
    return total;
  };

  return (
    <div className="App">
      <header>
        <h1>Sistema de Gerenciamento Financeiro</h1>
      </header>

      <div className="container">
        <div className="secao">
          <h2>Gerenciar Usuários</h2>
          <form onSubmit={editandoUsuario ? atualizarUsuario : adicionarUsuario}>
            <input
              type="text"
              placeholder="Nome"
              value={novoUsuario.nome}
              onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={novoUsuario.email}
              onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
              required
            />
            <button type="submit" className="btn-primary">
              {editandoUsuario ? 'Atualizar' : 'Adicionar'}
            </button>
            {editandoUsuario && (
              <button type="button" onClick={cancelarEdicao} className="btn-secondary">
                Cancelar
              </button>
            )}
          </form>

          <div className="lista">
            {usuarios.length === 0 ? (
              <p className="vazio">Nenhum usuário cadastrado</p>
            ) : (
              usuarios.map(usuario => (
                <div key={usuario.id} className="item">
                  <div className="info">
                    <strong>{usuario.nome}</strong>
                    <span>{usuario.email}</span>
                  </div>
                  <div className="acoes">
                    <button onClick={() => editarUsuario(usuario)} className="btn-edit">
                      Editar
                    </button>
                    <button onClick={() => deletarUsuario(usuario.id)} className="btn-delete">
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="secao">
          <h2>Registrar Transação</h2>
          <form onSubmit={adicionarTransacao}>
            <input
              type="text"
              placeholder="Descrição"
              value={novaTransacao.descricao}
              onChange={(e) => setNovaTransacao({...novaTransacao, descricao: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Valor"
              step="0.01"
              value={novaTransacao.valor}
              onChange={(e) => setNovaTransacao({...novaTransacao, valor: e.target.value})}
              required
            />
            <select
              value={novaTransacao.tipo}
              onChange={(e) => setNovaTransacao({...novaTransacao, tipo: e.target.value})}
            >
              <option value="Entrada">Entrada</option>
              <option value="Saida">Saída</option>
            </select>
            <select
              value={novaTransacao.usuarioId}
              onChange={(e) => setNovaTransacao({...novaTransacao, usuarioId: e.target.value})}
              required
            >
              <option value="">Selecione o Usuário</option>
              {usuarios.map(usuario => (
                <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
              ))}
            </select>
            <button type="submit" className="btn-primary">Adicionar Transação</button>
          </form>

          <div className="resumo">
            <h3>Saldo Total: 
              <span className={calcularTotal() >= 0 ? 'positivo' : 'negativo'}>
                R$ {calcularTotal().toFixed(2)}
              </span>
            </h3>
          </div>

          <div className="lista">
            {transacoes.length === 0 ? (
              <p className="vazio">Nenhuma transação registrada</p>
            ) : (
              transacoes.map(transacao => (
                <div key={transacao.id} className={`item transacao ${transacao.tipo.toLowerCase()}`}>
                  <div className="info">
                    <strong>{transacao.descricao}</strong>
                    <span>R$ {transacao.valor.toFixed(2)} - {transacao.tipo}</span>
                    <small>Usuário: {transacao.usuario?.nome || 'N/A'}</small>
                  </div>
                  <button onClick={() => deletarTransacao(transacao.id)} className="btn-delete">
                    Excluir
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;