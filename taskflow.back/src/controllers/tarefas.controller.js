const tarefaModel = require('../models/tarefa.model');

const tarefasController = {
    listar(req, res) {
        const { coluna } = req.query;
        const resultado = coluna
            ? tarefaModel.listarPorColuna(coluna)
            : tarefaModel.listar();
        res.json(resultado);
    },
    buscarPorId(req, res) {
        const tarefa = tarefaModel.buscar(parseInt(req.params.id));
        if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.json(tarefa);
    },
    criar(req, res) {
        const { texto, coluna } = req.body;
        let colunatexto = 'afazer' || 'andamento' || 'concluida'
        if (!texto) return res.status(400).json({ erro: 'Texto obrigatório' });
        if (coluna === !colunatexto) return res.status(400).json ({ erro: 'insira uma das coluna: "afazer", "andamento" ou "concluida" '})
        res.status(201).json(tarefaModel.adicionar(req.body));
    },
    atualizar(req, res) {
        const atualizada = tarefaModel.atualizar(parseInt(req.params.id), req.body);
        if (!atualizada) return res.status(404).json({
            erro: 'Tarefa não encontrada'
        });
        res.json(atualizada);
    },
    remover(req, res) {
        const removida = tarefaModel.remover(parseInt(req.params.id));
        if (!removida) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.json({ mensagem: 'Tarefa removida', tarefa: removida });
    },
};
module.exports = tarefasController;
