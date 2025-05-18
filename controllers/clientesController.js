const clienteService = require('../services/clienteService');
const NodeCache = require('node-cache');
const chalk = require('chalk');

const cache = new NodeCache({ stdTTL: 30 }); // cache com tempo de vida de 30 segundos

const getAllClientes = async (req, res) => {
  try {
    const cacheKey = 'clientes';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log(chalk.blue('[CACHE] Lista de clientes retornada do cache.'));
      return res.json(cachedData);
    }

    const clientes = await clienteService.buscarTodos();
    cache.set(cacheKey, clientes);
    console.log(chalk.green('[DB] Lista de clientes buscada do banco de dados.'));
    res.json(clientes);
  } catch (error) {
    console.error(chalk.red('Erro ao buscar clientes:'), error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

const createCliente = async (req, res) => {
  try {
    const cliente = await clienteService.criarCliente(req.body);
    cache.del('clientes'); // Invalida cache após modificação
    console.log(chalk.yellow('[CACHE INVALIDADO] após criação de cliente.'));
    res.status(201).json(cliente);
  } catch (error) {
    console.error(chalk.red('Erro ao criar cliente:'), error);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};

const updateCliente = async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await clienteService.atualizarCliente(id, req.body);
    cache.del('clientes'); // Invalida cache após modificação
    console.log(chalk.yellow('[CACHE INVALIDADO] após atualização de cliente.'));
    res.json(cliente);
  } catch (error) {
    console.error(chalk.red('Erro ao atualizar cliente:'), error);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const id = req.params.id;
    await clienteService.deletarCliente(id);
    cache.del('clientes'); // Invalida cache após modificação
    console.log(chalk.yellow('[CACHE INVALIDADO] após exclusão de cliente.'));
    res.status(204).send();
  } catch (error) {
    console.error(chalk.red('Erro ao deletar cliente:'), error);
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
};

module.exports = {
  getAllClientes,
  createCliente,
  updateCliente,
  deleteCliente,
};
