const db = require('./db');

exports.buscarTodos = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM clientes', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
