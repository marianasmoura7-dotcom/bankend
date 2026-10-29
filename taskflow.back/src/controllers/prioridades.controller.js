const prioridadeModel = require('../models/prioridade.model');
const criarErro = require('../utils/criarErro');
const prioridadeController = {
    async listar(req, res) { res.json(await prioridadeModel.listar()); },
     async buscarPorId(req, res) {
        const pr = await prioridadeModel.buscar(parseInt(req.params.id));
        if (!pr)  throw criarErro(404, 'Prioridade não encontrada');
        res.json(pr);
    },
}

module.exports = prioridadeController;     