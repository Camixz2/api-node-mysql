const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// GET: Buscar todos os clientes
router.get('/', clientesController.getAllClientes);

// POST: Criar novo cliente
router.post('/', clientesController.createCliente);

// PUT: Atualizar cliente por ID
router.put('/:id', clientesController.updateCliente);

// DELETE: Remover cliente por ID
router.delete('/:id', clientesController.deleteCliente);

module.exports = router;
