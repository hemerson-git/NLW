import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//Rotas: Endereço comoleto da requisição
//Recursos: Qual entidade do sistema estamos acessando


// GET: Buscar uma ou mais informações do backend
// POST: Criar uma nova informação no backend
// PUT: Alterar uma informação existente no backend
// DELETE: Remove uma informação do backend

// POST: http://localhost:3333/users = Criar um usuário
// GET: http://localhost:3333/users = Listar Usuários
// GET: http://localhost:3333/users/5 = Buscar dados do usuário que tem o ID 5

// Request Params: Parâmetros que vêm na própria rota que identificam um recurso
// Query params: Parâmetros que vêm na própria rota, geralmente opcionais, para filtros, paginação e etc.
// Request Body: Parâmetros para criação e atualização de um elemento.

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.listen(3333);
