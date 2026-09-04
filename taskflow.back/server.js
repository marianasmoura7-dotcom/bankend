const express = require('express');
const PORTA = 3000
const app = express();
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require ('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');


app.use (express.json())
app.use('/tarefas', tarefasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/projetos', projetosRoutes)

app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada!' });
});


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

