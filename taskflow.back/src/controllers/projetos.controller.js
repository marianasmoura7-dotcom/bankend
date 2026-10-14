
const projetoModel = require('../models/projeto.model');
const projetosController = {
    async listar(req, res) { res.json(await projetoModel.listar()); },
    async buscarPorId(req, res) {
        const p = await projetoModel.buscar(parseInt(req.params.id));
        if (!p) return res.status(404).json({ erro: 'Projeto não encontrado' });
        res.json(p);
    },
    async criar(req, res) {
        const { nome } = req.body;
        if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório' });
        res.status(201).json(await projetoModel.adicionar(req.body));
    },
   async atualizar(req, res) {
        const atualizado = await projetoModel.atualizar(parseInt(req.params.id), req.body);
        if (!atualizado) return res.status(404).json({
            erro: 'Projeto não encontrado'
        });
        res.json(atualizado);
    },
    async remover(req, res) {
        const removido = await projetoModel.remover(parseInt(req.params.id));
        if (!removido) return res.status(404).json({ erro: 'Projeto não encontrado' });
        res.json({ mensagem: 'Projeto removido', projeto: removido });
    },
};
module.exports = projetosController;