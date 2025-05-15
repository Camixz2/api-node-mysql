const db = require('../configs/db'); // ajuste o caminho se necessário

const buscarTodos = async () => {
  const [rows] = await db.query('SELECT * FROM clientes');
  return rows;
};

const buscarPorId = async (id) => {
  const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
};

const criarCliente = async (cliente) => {
  const { nome, sobrenome, email, idade } = cliente;
  const [result] = await db.query(
    'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
    [nome, sobrenome, email, idade]
  );
  return { id: result.insertId, ...cliente };
};

const atualizarCliente = async (id, cliente) => {
  const { nome, sobrenome, email, idade } = cliente;
  await db.query(
    'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
    [nome, sobrenome, email, idade, id]
  );
  return { id, ...cliente };
};

const deletarCliente = async (id) => {
  await db.query('DELETE FROM clientes WHERE id = ?', [id]);
};

module.exports = {
  buscarTodos,
  buscarPorId,
  criarCliente,
  atualizarCliente,
  deletarCliente,
};
