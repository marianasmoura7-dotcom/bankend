const tarefaModel = require('../models/tarefa.model');
const usuarioModel = require('../models/usuario.model')

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
        // if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.json(tarefa);
    },
    criar(req, res) {


        console.log(req.usuario);
        const dados = {
            ...req.body,
            usuarioId: req.usuario.id, // vem do token
        };
        res.status(201).json(tarefaModel.adicionar(dados));

    },
    // const { texto, usuarioId,prioridade , coluna } = req.body;

    // if (!texto) return res.status(400).json({ erro: 'Texto obrigatório' });
    // if (prioridade && !['alta', 'media', 'baixa'].includes(prioridade)) {
    //     return res.status(400).json({ erro: 'Prioridade inválida. Use: alta, media ou baixa' });
    // }
    // // Validação de Coluna 
    // if (coluna && !['afazer', 'andamento', 'concluido'].includes(coluna)) {
    //     return res.status(400).json({ erro: 'Coluna inválida. Use: afazer, andamento ou concluido' });
    // }
//     if(usuarioId) {
//         const usuarioExiste = usuarioModel.buscar(parseInt(usuarioId));
//         if (!usuarioExiste) {
//             return res.status(400).json({ erro: 'Usuário não encontrado' });
//         }
//     }
//         res.status(201).json(tarefaModel.adicionar(req.body));
// },
    atualizar(req, res) {
        const atualizada = tarefaModel.atualizar(parseInt(req.params.id), req.body);
        // if (!atualizada) return res.status(404).json({
        //     erro: 'Tarefa não encontrada'
        // });
        res.json(atualizada);
    },
        remover(req, res) {
    const removida = tarefaModel.remover(parseInt(req.params.id));
    if (!removida) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json({ mensagem: 'Tarefa removida', tarefa: removida });
},
};
module.exports = tarefasController;
