const pool = require('./db');

const buscarPorEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
};

const criarUsuario = async ({ nome, email, senha }) => {
    const [result] = await pool.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senha]
    );
    return { id: result.insertId, nome, email, senha };
};

module.exports = {
    buscarPorEmail,
    criarUsuario
};
