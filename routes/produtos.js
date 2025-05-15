const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
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
router.get('/', verifyJWT, produtosController.getAllProdutos);
router.post('/', verifyJWT, produtosController.createProduto);
router.put('/:id', verifyJWT, produtosController.updateProduto);
router.delete('/:id', verifyJWT, produtosController.deleteProduto);

module.exports = router;
