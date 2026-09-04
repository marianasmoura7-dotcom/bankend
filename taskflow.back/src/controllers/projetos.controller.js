

const projetoModel = require('../models/projeto.model');
const projetosController = {
    listar(req, res) { res.json(projetoModel.listar()); },
    buscarPorId(req, res) {
        const p = projetoModel.buscar(parseInt(req.params.id));
        if (!p) return res.status(404).json({ erro: 'Projeto não encontrado' });
        res.json(p);
    },
    criar(req, res) {
        const { nome } = req.body;
        if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório' });
        res.status(201).json(projetoModel.adicionar(req.body));
    },
    atualizar(req, res) {
        const atualizado = projetoModel.atualizar(parseInt(req.params.id), req.body);
        if (!atualizado) return res.status(404).json({
            erro: 'Projeto não encontrado'
        });
        res.json(atualizado);
    },
    remover(req, res) {
        const removido = projetoModel.remover(parseInt(req.params.id));
        if (!removido) return res.status(404).json({ erro: 'Projeto não encontrado' });
        res.json({ mensagem: 'Projeto removido', projeto: removido });
    },
};
module.exports = projetosController;