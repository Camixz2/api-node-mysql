const connection = require('../services/db');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 * 5 }); // cache válido por 5 minutos

// Logs coloridas no console
function logCache(foiCache) {
  if (foiCache) {
    console.log('\x1b[32m%s\x1b[0m', '[CACHE] Resposta veio do cache (produtos)');
  } else {
    console.log('\x1b[33m%s\x1b[0m', '[DB] Resposta veio do banco (produtos)');
  }
}

// Buscar todos os produtos (GET) com cache
exports.getAllProdutos = async (req, res) => {
  try {
    const cachedProdutos = cache.get('produtos');
    if (cachedProdutos) {
      logCache(true);
      return res.json(cachedProdutos);
    }

    const [results] = await connection.query('SELECT * FROM produtos');
    cache.set('produtos', results);
    logCache(false);
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).send('Erro no servidor');
  }
};

// Criar produto POST + limpar cache
exports.createProduto = async (req, res) => {
  const { nome, descricao, preco, quantidade } = req.body;

  if (!nome || !descricao || preco == null || quantidade == null) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(query, [nome, descricao, preco, quantidade]);

    cache.del('produtos'); // Limpa cache

    res.status(201).json({ id: result.insertId, nome, descricao, preco, quantidade });
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(500).send('Erro no servidor');
  }
};

// Atualizar produto (PUT) + limpar cache
exports.updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade } = req.body;

  if (!nome || !descricao || preco == null || quantidade == null) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ? WHERE id = ?';
    await connection.query(query, [nome, descricao, preco, quantidade, id]);

    cache.del('produtos'); // Limpa cache

    res.json({ mensagem: 'Produto atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).send('Erro no servidor');
  }
};

// Deletar produto (DELETE) + limpar cache
exports.deleteProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM produtos WHERE id = ?';
    await connection.query(query, [id]);

    cache.del('produtos'); // Limpa cache

    res.json({ mensagem: 'Produto deletado com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).send('Erro no servidor');
  }
};
