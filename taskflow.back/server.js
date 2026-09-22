require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORTA = process.env.PORTA || 3000;

const authRoutes = require('./src/routes/auth.routes');
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');



const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType')
const autenticar = require('./src/middlewares/autenticar');

const app = express();

app.use(cors({ 
    origin: 'https://taskflow-beta-dun.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    
}));
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API TaskFlow rodando com sucesso!' });
});

app.use('/auth', authRoutes); // POST /auth/login
app.use('/tarefas', autenticar, tarefasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/projetos', autenticar, projetosRoutes);




// app.use(validarContentType);

// app.use('/tarefas', tarefasRoutes);

// app.use('/projetos', projetosRoutes);
// app.use('/auth', authRoutes);


app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        metodo: req.method,
        caminho: req.url,
    });
});

module.exports = app;
