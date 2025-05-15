const jwt = require('jsonwebtoken');
const SECRET = 'Backend-II';

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ auth: false, message: 'Falha na autenticação do token.' });

        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyJWT;
