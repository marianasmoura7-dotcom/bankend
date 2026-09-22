require('dotenv').config();

const express = require('express');

const PORTA = process.env.PORTA || 3000;
const authRoutes = require('./src/routes/auth.routes');
const app = express();
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');
const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType')
const cors = require('cors');
const autenticar = require('./src/middlewares/autenticar');

app.use(cors({ origin: 'https://taskflow-beta-dun.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    
}));
app.use(express.json());
app.use('/auth', authRoutes); // POST /auth/login


app.use('/tarefas', autenticar, tarefasRoutes);
// app.use('/usuarios', autenticar, usuariosRoutes);
app.use('/projetos', autenticar, projetosRoutes);




app.use(validarContentType);
app.use(logger);
// app.use('/tarefas', tarefasRoutes);
app.use('/usuarios', usuariosRoutes);
// app.use('/projetos', projetosRoutes);
// app.use('/auth', authRoutes);

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

