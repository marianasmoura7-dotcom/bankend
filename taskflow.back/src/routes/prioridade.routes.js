const express = require('express');
const router = express.Router();
const prioridadeController = require('../controllers/prioridade.controller');

router.get('/', prioridadeController.listar);

module.exports = router