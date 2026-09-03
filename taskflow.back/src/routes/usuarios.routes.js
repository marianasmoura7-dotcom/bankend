const express = require('express');
const router = express.Router();
// Dados ainda aqui — vão para models/ no Dia 5

let usuarios = [];
let proximoUsuario = 1;
// GET /tarefas — listar todas (com filtro opcional por coluna)

router.get('/usuarios', (req, res) => {
    res.json(usuarios);
});
router.get('/', (req, res) => {
    const { nome } = req.query;
    let resul = usuarios;
    if (nome) resul = usuarios.filter(u => u.nome === nome);
    res.json(resul);
});
// GET /usuario/:id — buscar por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return res.status(404).json({ erro: 'usuario não encontrada' });
    res.json(usuario);
});

router.post('/', (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome) return res.status(400).json({ erro: 'insira um nome' });
    const novo = {
        id: proximoUsuario++,
        email: email,
        nome: nome,
        senha: senha
    };
    usuarios.push(novo);
    res.status(201).json(novo);
});
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = usuarios.findIndex(u => u.id === id); // Busca o usuário na lista
    if (idx === -1) return res.status(404).json({ erro: 'Usuário não encontrado' }); // Retorna 404 se não achar
    usuarios[idx] = { ...usuarios[idx], ...req.body, id }; // Atualiza os dados mantendo o ID original
    res.json(usuarios[idx]); // Retorna o usuário atualizado
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'usuario não encontrada' });
    const removido= tarefas.splice(idx, 1)[0];
    res.json({ mensagem: 'usuario removido', usuario: removido });
});



module.exports = router;