const nodemon = require('nodemon');
const tarefaModel = require('../models/tarefa.model');
const usuarioModel = require('../models/usuario.model');

const usuariosController = {
    async listar(req, res) {
        res.json(await usuarioModel.listar());
    },
    async buscarPorId(req, res) {
        const usuario = await usuarioModel.buscar(parseInt(req.params.id));
        if (!usuario) return res.status(404).json({ erro: 'usuario não encontrado' });
        res.json(usuario);
    },
    async criar(req, res) {
        const { nome, email, senha_hash } = req.body;
        // if (!nome || !email) return res.status(400).json({ erro: 'nome e email obrigatório' });
        res.status(201).json(await usuarioModel.adicionar(req.body));
    },
    async atualizar(req, res) {
        const atualizado = await usuarioModel.atualizar(parseInt(req.params.id), req.body);
        // if (!atualizado) return res.status(404).json({
        //     erro: 'usuario não encontrado'
        // });
        res.json(atualizado);
    },
    async remover(req, res) {
        const removida = await usuarioModel.remover(parseInt(req.params.id));
        if (!removida) return res.status(404).json({ erro: 'usuario não encontrado' });
        res.json({ mensagem: 'usuario removido', usuario: removida });
    },
    };
module.exports = usuariosController;