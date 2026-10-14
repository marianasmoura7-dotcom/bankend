const tarefaModel = require('../models/tarefa.model');
const usuarioModel = require('../models/usuario.model')

const tarefasController = {
    async listar(req, res) {
        const { coluna } = req.query;
        const resultado = coluna
            ? await tarefaModel.listarPorColuna(coluna)
            : await tarefaModel.listar();
        res.json(resultado);
    },
    async buscarPorId(req, res) {
        const tarefa = await tarefaModel.buscar(parseInt(req.params.id));
        if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.json(tarefa);
    },
    async criar(req, res) {
        const { texto, id_prioridade, coluna, usuario_id, idprojeto } = req.body;
        if (!texto || !usuario_id || !idprojeto) {
            return res.status(400).json({ erro: 'texto, usuario_id e idprojeto são obrigatórios' });
        }
        
        res.status(201).json(await tarefaModel.adicionar({texto, id_prioridade, coluna, usuario_id, idprojeto}));
    },
    async atualizar(req, res) {
        const atualizada = await tarefaModel.atualizar(parseInt(req.params.id), req.body);
        // if (!atualizada) return res.status(404).json({
        //     erro: 'Tarefa não encontrada'
        // });
        res.json(atualizada);
    },
    async remover(req, res) {
        const removida = await tarefaModel.remover(parseInt(req.params.id));
        if (!removida) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.json({ mensagem: 'Tarefa removida', tarefa: removida });
    }
};
module.exports = tarefasController;
