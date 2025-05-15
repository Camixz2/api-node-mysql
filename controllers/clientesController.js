const connection = require('../services/db');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 * 5 }); // cache válido por 5 minutos

// Função para logs coloridos no console
function logCache(foiCache) {
  if (foiCache) {
    console.log('\x1b[32m%s\x1b[0m', '[CACHE] Resposta veio do cache');
  } else {
    console.log('\x1b[33m%s\x1b[0m', '[DB] Resposta veio do banco');
  }
}

// Buscar todos os clientes (GET) com cache
exports.getAllClientes = async (req, res) => {
  try {
    const cachedClientes = cache.get('clientes');
    if (cachedClientes) {
      logCache(true);
      return res.json(cachedClientes);
    }

    const [results] = await connection.query('SELECT * FROM clientes');
    cache.set('clientes', results);
    logCache(false);
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
    res.status(500).send('Erro no servidor');
  }
};

// Criar cliente (POST) + limpar cache
exports.createCliente = async (req, res) => {
  const { nome, sobrenome, email, idade } = req.body;

  if (!nome || !sobrenome || !email || !idade) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(query, [nome, sobrenome, email, idade]);

    cache.del('clientes'); // Limpa cache

    res.status(201).json({ id: result.insertId, nome, sobrenome, email, idade });
  } catch (err) {
    console.error('Erro ao criar cliente:', err);
    res.status(500).send('Erro no servidor');
  }
};

// Atualizar cliente (PUT) + limpar cache
exports.updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, email, idade } = req.body;

  if (!nome || !sobrenome || !email || !idade) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?';
    await connection.query(query, [nome, sobrenome, email, idade, id]);

    cache.del('clientes'); // Limpa cache

    res.json({ mensagem: 'Cliente atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar cliente:', err);
    res.status(500).send('Erro no servidor');
  }
};

// Deletar cliente (DELETE) + limpar cache
exports.deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM clientes WHERE id = ?';
    await connection.query(query, [id]);

    cache.del('clientes'); // Limpa cache

    res.json({ mensagem: 'Cliente deletado com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar cliente:', err);
    res.status(500).send('Erro no servidor');
  }
};
