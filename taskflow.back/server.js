require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORTA = process.env.PORTA || 3000;

const authRoutes = require('./src/routes/auth.routes');
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');
const tratarErros = require('./src/middlewares/erro.middleware');


const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType')
const autenticar = require('./src/middlewares/autenticar');
const pool = require('./src/database/db');
const app = express();

app.use(cors({ 
    origin: ['https://taskflow-beta-dun.vercel.app' , 'http://localhost:5173' ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    
}));
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(' Erro ao conectar ao banco de dados usando o Pool:', err.stack);
  } else {
    console.log(' Conexão com o Pool estabelecida com sucesso! Hora do banco:', res.rows[0].now);
  }
});
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API TaskFlow rodando com sucesso!' });
});

app.use('/auth', authRoutes); // POST /auth/login
app.use('/tarefas',  tarefasRoutes); //autenticar,
app.use('/usuarios', usuariosRoutes);
app.use('/projetos',  projetosRoutes); //autenticar,
app.use(tratarErros);
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`); 
});

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        metodo: req.method,
        caminho: req.url,
    });
});

module.exports = app;
