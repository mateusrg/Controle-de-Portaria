const express = require('express');
const router = express.Router();
const veiculosController = require('../controllers/veiculosController');

router.post('/veiculo', veiculosController.criarVeiculo);
router.get('/veiculo', veiculosController.listarVeiculos);
router.get('/veiculo/selecionarPorId/:idVeiculo', veiculosController.selecionarVeiculoPorId);
router.get('/veiculo/listarPorMorador/:idMorador', veiculosController.listarVeiculosPorMorador);
router.get('/veiculo/selecionarPorBox/:idBox', veiculosController.selecionarVeiculoPorBox);
router.get('/veiculo/selecionarPorPlaca/:placa', veiculosController.selecionarVeiculoPorPlaca);
router.get('/veiculo/selecionarPorModelo/:modelo', veiculosController.listarVeiculosPorModelo);
router.put('/veiculo/:idVeiculo', veiculosController.atualizarVeiculo);
router.put('/veiculo/setIdMorador', veiculosController.setIdMoradorVeiculo);
router.put('/veiculo/setIdBox', veiculosController.setIdBoxVeiculo);
router.put('/veiculo/setPlaca', veiculosController.setPlacaVeiculo);
router.put('/veiculo/setModelo', veiculosController.setModeloVeiculo);
router.put('/veiculo/setCor', veiculosController.setCorVeiculo);
router.put('/veiculo/setCriadoEm', veiculosController.setCriadoEmVeiculo);
router.delete('/veiculo/:idVeiculo', veiculosController.deletarVeiculo);

module.exports = router;