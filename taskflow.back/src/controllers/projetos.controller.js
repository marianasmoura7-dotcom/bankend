
const projetoModel = require('../models/projeto.model');
const criarErro = require('../utils/criarErro');
const projetosController = {
    async listar(req, res) { res.json(await projetoModel.listar()); },
    async buscarPorId(req, res) {
        const p = await projetoModel.buscar(parseInt(req.params.id));
        if (!p)  throw criarErro(404, 'Projeto não encontrado');
        res.json(p);
    },
    async criar(req, res) {
        const { nome } = req.body;
        if (!nome) throw criarErro(400, 'Nome é obrigatório');
        res.status(201).json(await projetoModel.adicionar(req.body));
    },
   async atualizar(req, res) {
        const atualizado = await projetoModel.atualizar(parseInt(req.params.id), req.body);
        if (!atualizado) throw criarErro(404, 'Projeto não encontrado');
        res.json(atualizado);
    },
    async remover(req, res) {
        const removido = await projetoModel.remover(parseInt(req.params.id));
        if (!removido) throw criarErro(404, 'Projeto não encontrado');
        res.json({ mensagem: 'Projeto removido', projeto: removido });
    },
};
module.exports = projetosController;