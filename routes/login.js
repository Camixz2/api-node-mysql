const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secret = 'Backend-II'; //chave para JWT

router.post('/', (req, res) => {
    const { user, password } = req.body;

    if (user === 'Luke' && password === '1234') {
        const token = jwt.sign({ id: 1 }, secret, { expiresIn: 300 }); // token válido 5 min
        return res.json({ auth: true, token });
    }

    res.status(401).json({ auth: false, message: 'Login inválido' });
});

module.exports = router;


