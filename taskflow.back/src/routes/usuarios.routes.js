const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const validar = require ('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const idValido = validar (schemas.id, 'params');

router.get('/', usuariosController.listar);
router.post('/',  usuariosController.criar); //validar(schemas.usuario),
router.get('/:id', idValido, usuariosController.buscarPorId);
router.put('/:id', idValido, usuariosController.atualizar); //, validar(schemas.usuario)
router.delete('/:id', idValido, usuariosController.remover);



module.exports = router;