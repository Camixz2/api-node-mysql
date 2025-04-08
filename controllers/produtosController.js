const connection = require('../services/db');

// GET - Listar todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM produtos');
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).send('Erro no servidor');
  }
};

// POST - Criar um novo produto
exports.createProduto = async (req, res) => {
  const { nome, descricao, preco } = req.body;
  try {
    const query = 'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, NOW())';
    const [result] = await connection.query(query, [nome, descricao, preco]);
    res.status(201).json({
      id: result.insertId,
      nome,
      descricao,
      preco,
      data_atualizado: new Date()
    });
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(500).send('Erro no servidor');
  }
};

// PUT - Atualizar produto
exports.updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;
  try {
    const query = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = NOW() WHERE id = ?';
    await connection.query(query, [nome, descricao, preco, id]);
    res.send('Produto atualizado com sucesso!');
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).send('Erro no servidor');
  }
};

// DELETE - Excluir produto
exports.deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM produtos WHERE id = ?';
    await connection.query(query, [id]);
    res.send('Produto deletado com sucesso!');
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).send('Erro no servidor');
  }
};
