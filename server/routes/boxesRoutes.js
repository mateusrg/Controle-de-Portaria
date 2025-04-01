const express = require('express');
const router = express.Router();
const boxesController = require('../controllers/boxesController');

router.post('/box', boxesController.criarBox);
router.get('/box', boxesController.listarBoxes);
router.get('/box/selecionarPorId/:idBox', boxesController.selecionarBoxPorId);
router.get('/box/listarPorApartamento/:idApartamento', boxesController.listarBoxesPorApartamento);
router.put('/box/:idBox', boxesController.atualizarBox);
router.delete('/box/:idBox', boxesController.deletarBox);

module.exports = router;