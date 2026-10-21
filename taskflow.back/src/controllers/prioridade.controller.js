const prioridadeModel = require('../models/prioridade.model');
const prioridadeController = {
    async listar(req, res) { res.json(await prioridadeModel.listar()); },
}

module.exports = prioridadeController;     