const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefas.controller');
const validar = require ('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const autenticar = require('../middlewares/autenticar');
const idValido = validar (schemas.id, 'params');

router.get('/', tarefasController.listar);
router.get('/:id', idValido, tarefasController.buscarPorId);
router.post('/',validar(schemas.tarefa), tarefasController.criar);   //
router.put('/:id', tarefasController.atualizar); //autenticar,validar(schemas.tarefa),
router.delete('/:id', idValido, tarefasController.remover);

module.exports = router;