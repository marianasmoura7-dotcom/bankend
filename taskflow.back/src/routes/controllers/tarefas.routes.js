const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefas.controller');

let tarefas = [];
let proximoId = 1;
router.get('/', tarefasController.listar);
router.get('/', (req, res) => {
    const { coluna } = req.query;
    let resultado = tarefas;
    if (coluna) resultado = tarefas.filter(t => t.coluna === coluna);
    res.json(resultado);
});
router.post('/', tarefasController.criar);
router.get('/:id', tarefasController.buscarPorId);
router.put('/:id', tarefasController.atualizar);
router.delete('/:id', tarefasController.remover);
module.exports = router;