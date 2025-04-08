const connection = require('../services/db');

// Buscar todos os clientes (GET)
exports.getAllClientes = async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM clientes');
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
    res.status(500).send('Erro no servidor');
  }
};

// Criar cliente (POST)
exports.createCliente = async (req, res) => {
  const { nome, sobrenome, email, idade } = req.body;

  if (!nome || !sobrenome || !email || !idade) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(query, [nome, sobrenome, email, idade]);

    res.status(201).json({ id: result.insertId, nome, sobrenome, email, idade });
  } catch (err) {
    console.error('Erro ao criar cliente:', err);
    res.status(500).send('Erro no servidor');
  }
};

// Atualizar cliente (PUT)
exports.updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, email, idade } = req.body;

  if (!nome || !sobrenome || !email || !idade) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?';
    await connection.query(query, [nome, sobrenome, email, idade, id]);
    res.json({ mensagem: 'Cliente atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar cliente:', err);
    res.status(500).send('Erro no servidor');
  }
};

// Deletar cliente (DELETE)
exports.deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM clientes WHERE id = ?';
    await connection.query(query, [id]);
    res.json({ mensagem: 'Cliente deletado com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar cliente:', err);
    res.status(500).send('Erro no servidor');
  }
};
