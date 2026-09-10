require('dotenv').config();

const express = require('express');

const PORTA = process.env.PORTA || 3000;

const app = express();
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');
const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType')
const cors = require('cors');

// const corsMiddleware = require('./src/middlewares/cors');


app.use(cors({ origin: process.env.CORS_ORIGIN || 'localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    
}));

app.use(express.json());
app.use(validarContentType);
app.use(logger);
app.use('/tarefas', tarefasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/projetos', projetosRoutes)

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
// app.listen(PORTA, () => console.log(`Porta ${PORTA}`));

