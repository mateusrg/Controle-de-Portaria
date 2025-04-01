const express = require('express');
const router = express.Router();
const moradoresController = require('../controllers/moradoresController');

router.post('/morador', moradoresController.criarMorador);
router.get('/morador', moradoresController.listarMoradores);
router.get('/morador/selecionarPorId/:idMorador', moradoresController.selecionarMoradorPorId);
router.get('/morador/listarPorApartamento/:idApartamento', moradoresController.listarMoradoresPorApartamento);
router.get('/morador/listarPorNome/:nome', moradoresController.listarMoradoresPorNome);
router.post('/morador/pesquisar', moradoresController.pesquisarMoradores);
router.put('/morador/:idMorador', moradoresController.atualizarMorador);
router.put('/morador/setIdApartamento/:idMorador', moradoresController.setIdApartamentoMorador);
router.put('/morador/setNome/:idMorador', moradoresController.setNomeMorador);
router.put('/morador/setTelefone/:idMorador', moradoresController.setTelefoneMorador);
router.put('/morador/setEmail/:idMorador', moradoresController.setEmailMorador);
router.put('/morador/setStatus/:idMorador', moradoresController.setStatusMorador);
router.put('/morador/setCriadoEm/:idMorador', moradoresController.setCriadoEmMorador);
router.delete('/morador/:idMorador', moradoresController.deletarMorador);

module.exports = router;