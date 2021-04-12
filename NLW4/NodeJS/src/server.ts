import 'reflect-metadata';
import express from 'express';
import "./database"

const app = express();

app.use(express.json());

app.listen(3333, () => console.log('Running on Port 3333'));

app.get('/', (req, res) => res.send('Hello World'));

app.post('/', (request, response) => {
  return response.send(request.body)
});

