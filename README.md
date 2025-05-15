# api-node-mysql

Projeto de API feita em Node.js que usa um banco de dados MySQL para armazenar informações de clientes e produtos.

Funcionalidades
Criar, ler, atualizar e excluir clientes e produtos.

Login com usuário e senha que gera um token de acesso (JWT).

Proteção das rotas usando esse token.

Cache para melhorar o desempenho das consultas.

Como rodar:
Instale as dependências:

npm install

Abra o XAMPP e inicie o MySQL.

Crie o banco de dados e as tabelas no MySQL.

Rode a API:
node index.js
Use o Postman para testar as rotas.