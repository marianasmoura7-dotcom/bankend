const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const validar = require ('../middlewares/validar');
const schemas = require('../middlewares/schemas');

router.get('/', usuariosController.listar);
router.post('/',  usuariosController.criar); //validar(schemas.usuario),
router.get('/:id', usuariosController.buscarPorId);
router.put('/:id', usuariosController.atualizar); //, validar(schemas.usuario)
router.delete('/:id', usuariosController.remover);



module.exports = router;