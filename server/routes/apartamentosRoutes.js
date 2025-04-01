const express = require('express');
const router = express.Router();
const apartamentosController = require('../controllers/apartamentosController');

router.post('/apartamento', apartamentosController.criarApartamento);
router.get('/apartamento', apartamentosController.listarApartamentos);
router.get('/apartamento/selecionarPorId/:idApartamento', apartamentosController.selecionarApartamentoPorId);
router.get('/apartamento/listarPorBloco/:bloco', apartamentosController.listarApartamentosPorBloco);
router.get('/apartamento/listarPorNumeracao/:numeracao', apartamentosController.listarApartamentosPorNumeracao);
router.put('/apartamento/:idApartamento', apartamentosController.atualizarApartamento);
router.put('/apartamento/setBloco/:idApartamento', apartamentosController.setBlocoApartamento);
router.put('/apartamento/setNumeracao/:idApartamento', apartamentosController.setNumeracaoApartamento);
router.delete('/apartamento/:idApartamento', apartamentosController.deletarApartamento);

module.exports = router;