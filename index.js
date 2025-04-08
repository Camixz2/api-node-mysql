const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const produtosRouter = require('./routes/produtos');
app.use('/produtos', produtosRouter);

const clientesRouter = require('./routes/clientes');
app.use('/clientes', clientesRouter);


app.get('/', (req, res) => {
  res.send('API Node + MySQL está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
