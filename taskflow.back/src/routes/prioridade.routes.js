const express = require('express');
const router = express.Router();
const prioridadesController = require('../controllers/prioridades.controller');

router.get('/', prioridadesController.listar);
router.get('/:id', prioridadesController.buscarPorId);

module.exports = router