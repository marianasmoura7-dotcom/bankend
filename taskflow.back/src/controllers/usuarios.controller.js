const nodemon = require('nodemon');
const tarefaModel = require('../models/tarefa.model');
const usuarioModel = require('../models/usuario.model');
const usuariosController = {
    listar(req, res) {
        res.json(usuarioModel.listar());
    },
    buscarPorId(req, res) {
        const usuario = usuarioModel.buscar(parseInt(req.params.id));
        if (!usuario) return res.status(404).json({ erro: 'usuario não encontrado' });
        res.json(usuario);
    },
    criar(req, res) {
        const { nome, email, senha } = req.body;
        if (!nome || !email) return res.status(400).json({ erro: 'nome e email obrigatório' });
        res.status(201).json(usuarioModel.adicionar(req.body));
    },
    atualizar(req, res) {
        const atualizado = usuarioModel.atualizar(parseInt(req.params.id), req.body);
        if (!atualizado) return res.status(404).json({
            erro: 'usuario não encontrado'
        });
        res.json(atualizado);
    },
    remover(req, res) {
        const idUsuario = Number(req.params.id);
        const tarefasDoUsuario = tarefaModel.listar().filter(t => t.usuarioId === idUsuario);
        if (tarefasDoUsuario.length > 0) {
            return res.status(400).json({
                erro: 'Usuário possui tarefas. Remova as tarefas antes de deletar o usuário.'
            });
        }
        const removido = usuarioModel.remover(parseInt(req.params.id));
            if (!removido) return res.status(404).json({ erro: 'usuario não encontrado' });
            res.json({ mensagem: 'usuario removido', usuario: removido });
        },
    };
    module.exports = usuariosController;