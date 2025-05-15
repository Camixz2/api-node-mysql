const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const jwt = require('jsonwebtoken');

const SECRET = 'Backend-II'; // segredo para validar o token JWT

// Middleware para validar token JWT
function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token']; // token enviado no header
    if (!token) return res.status(401).json({ auth: false, message: 'Token não fornecido.' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ auth: false, message: 'Token inválido.' });
        req.userId = decoded.id; // id do usuário decodificado do token
        next();
    });
}

// Rotas protegidas por JWT
router.get('/', verifyJWT, clientesController.getAllClientes);
router.post('/', verifyJWT, clientesController.createCliente);
router.put('/:id', verifyJWT, clientesController.updateCliente);
router.delete('/:id', verifyJWT, clientesController.deleteCliente);

module.exports = router;