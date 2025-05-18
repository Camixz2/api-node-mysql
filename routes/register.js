const express = require('express');
const router = express.Router();
const usuarioService = require('../services/usuarioService');

router.post('/', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const usuarioExistente = await usuarioService.buscarPorEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Usuário já existe com este e-mail' });
        }

        const novoUsuario = await usuarioService.criarUsuario({ nome, email, senha });
        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registrar usuário', erro: err });
    }
});

module.exports = router;
