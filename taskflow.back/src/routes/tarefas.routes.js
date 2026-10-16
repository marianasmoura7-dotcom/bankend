const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefas.controller');
const validar = require ('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const autenticar = require('../middlewares/autenticar');

router.get('/', tarefasController.listar);
router.get('/:id', tarefasController.buscarPorId);
router.post('/', validar(schemas.tarefa), tarefasController.criar);   //
router.put('/:id', validar(schemas.tarefa), tarefasController.atualizar); //autenticar,validar(schemas.tarefa),
router.delete('/:id',  tarefasController.remover);



module.exports = router;