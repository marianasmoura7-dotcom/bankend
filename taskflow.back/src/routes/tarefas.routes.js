const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefas.controller');
const validar = require ('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const autenticar = require('../middlewares/autenticar');

router.get('/', tarefasController.listar);
router.get('/:id', tarefasController.buscarPorId);
router.post('/',tarefasController.criar);   //,autenticar,validar(schemas.tarefa)
router.put('/:id',tarefasController.atualizar); //autenticar,validar(schemas.tarefa),
router.delete('/:id',autenticar, tarefasController.remover);



module.exports = router;