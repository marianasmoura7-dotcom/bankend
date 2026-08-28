const express = require('express');
const PORTA = 3000
const app = express();
let tarefas = [{
    id: 1,
    texto: 'Estudar Node',
    prioridade: 'alta',
    coluna: 'afazer',
},

{
    id: 2,
    texto: 'Criar API',
    prioridade: 'baixa',
    coluna: 'andamento'
},

{
    id: 3,
    texto: 'Testar Postman',
    prioridade: 'media',
    coluna: 'concluido'
},
{
    id: 4,
    texto: 'escrever',
    prioridade: 'media',
    coluna: 'afazer'
},
{
    id: 5,
    texto: 'dormir',
    prioridade: 'baixa',
    coluna: 'andamento'
},
{
    id: 6,
    texto: 'jogar',
    prioridade: 'baixa',
    coluna: 'afazer'
}
]
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensagem: 'TaskFlow API funcionando!' });
});

let proximoId = 7;

app.post('/tarefas', (req, res) => {
    const { texto, prioridade, coluna, cidade } = req.body
    const novaTarefa = {
        id: proximoId++,
        texto: texto,
        prioridade: prioridade || 'media',
        coluna: coluna || 'afazer',
        cidade: cidade || "",
    };

    tarefas.push(novaTarefa)

    res.status(201).json(novaTarefa);
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});

app.put('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const { texto, cidade, coluna, prioridade } = req.body;

    const indice = tarefas.findIndex(t => t.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    const tarefaAtualizada = {
        id, texto,
        prioridade: prioridade || 'media',
        coluna: coluna || 'afazer',
        cidade: cidade || ""
    };
    tarefas[indice] = tarefaAtualizada;
    res.json(tarefaAtualizada);
});

app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) {
        return res.status(404).json({ erro: 'tarefa não encontrada' });
    }
    tarefas = tarefas.filter(t => t.id !== id);
    res.json({ mensagem: 'Tarefa removida com sucesso', id });
});

app.get('/tarefas', (req, res) => {
    const { coluna, prioridade } = req.query;

    let resultado = tarefas;

    if (coluna) {
        resultado = resultado.filter(t => t.coluna === coluna);
    }
    if (prioridade) {
        resultado = resultado.filter(t => t.prioridade === prioridade);
    }

    res.json(resultado);

    // console.log(req.headers)


    // console.log('baseURL', req.host)
    // console.log('url: ', req.url)

});

app.get('/ok', (req, res) => {
    res.json({ staus: 'ok', dados: ['mariana', '19anos', 'estudante', 'capoeiras'] });
});

app.get('/criado', (req, res) => {
    res.status(201).json({ mensagem: 'criado com sucesso!' });
});

app.get('/texto', (req, res) => {
    res.send('o essencial é invisivel aos olhos !')
});

app.get('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id)
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) {
        return res.status(404).json({ erro: 'tarefa não encontrada' })
    }
    res.json(tarefa);
});

let usuarios = [
    {
        id: 1,
        nome: 'Mariana',
        email: 'mariana.s.moura7@aluno.senai.br',
        senha: '1234'
    },
    {
        id: 2,
        nome: 'joao',
        email: 'testuser001@example.com',
        senha: 'dfff',
    },
];

let proximoUsuario = 3

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});
app.get('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id)
    const usuario = usuarios.find(usuario => usuario.id === id);
    if (!usuario) {
        return res.status(404).json({ erro: 'usuario não encontrado no cadastro' })
    }
    res.json(usuario)
});

app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body
    const novoUsuario = {
        id: proximoUsuario++,
        nome: nome,
        email: email,
        senha: senha
    };
    usuarios.push(novoUsuario);
    res.json(novoUsuario)

});


app.put('/usuarios/:id', (req, res) => {
const id = Number(req.params.id);
const index = usuarios.findIndex(u => u.id === id);
if (index === -1) return res.status(404).json({ erro: ' usuario Não encontrado' });
usuarios[index] = { id, ...req.body };
res.json(usuarios[index]);
}); 


app.delete('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(usuario => usuario.id === id);
    if (!usuario) {
        return res.status(404).json({ erro: 'usuario não encontrado' });
    }
    usuarios = usuarios.filter(usuario => usuario.id !== id);
    res.json({ mensagem: 'usuario removido', id });
});
// app.put('usuarios/ :id', (req, res) => {
//     const id = Number(req.params.id);
//  
//     const listaUsuario = usuarios.findIndex(usuario => usuario.id === id);
//     if (listaUsuario === -1) {
//         return res.status(404).json({ erro: 'Usuario  não encontrado na base de cadastro' });
//     }
//     const usuarioAtualizado = {
//         id,
//         nome,
//         email,
//         senha
//     };
//     usuarios[listaUsuario] = usuarioAtualizado;
//     res.json(usuarioAtualizado);
// });

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        metodo: req.method,
        caminho: req.url,
    });
});
app.listen(PORTA, () => console.log(`Porta ${PORTA}`));

