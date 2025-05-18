const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


const produtosRouter = require('./routes/produtos');
app.use('/produtos', produtosRouter);

const clientesRouter = require('./routes/clientes');
app.use('/clientes', clientesRouter);


const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

const registerRouter = require('./routes/register');
app.use('/register', registerRouter);


app.get('/', (req, res) => {
  res.send('API Node + MySQL está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
