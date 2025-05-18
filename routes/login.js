const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const usuarioService = require('../services/usuarioService');

const secret = 'Backend-II';

router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await usuarioService.buscarPorEmail(email);
    if (!usuario) {
        return res.status(401).json({ auth: false, message: 'Usuário não encontrado' });
    }

    if (usuario.senha !== senha) {
        return res.status(401).json({ auth: false, message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: usuario.id }, secret, { expiresIn: 300 }); // 5 minutos
    res.json({ auth: true, token });
});

module.exports = router;
