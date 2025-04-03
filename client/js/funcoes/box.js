import Box from '../../models/Box.js';

const urlBase = 'http://localhost:3000';

async function listarTodos() {
  const response = await fetch(`${urlBase}/box`);
  const result = await response.json();
  const boxesJson = result.data;
  let boxes = [];
  boxesJson.forEach(box => boxes.push(new Box({
    idBox: box['id_box'],
    idApartamento: box['id_apartamento'],
    bloco: box['bloco'],
    numeracao: box['numeracao'],
    idVeiculo: box['id_veiculo'],
    idMorador: box['id_morador'],
    placa: box['placa'],
    modelo: box['modelo'],
    cor: box['cor'],
    criadoEm: box['criado_em']
  })));
  if (!result.success) {
    alert(result.message);
  }
  return boxes;
}

async function listarPorApartamento(idApartamento) {
  const response = await fetch(`${urlBase}/box/listarPorApartamento/${idApartamento}`);
  const result = await response.json();
  const boxesJson = result.data;
  let boxes = [];
  boxesJson.forEach(box => boxes.push(new Box({
    idBox: box['id_box'],
    idApartamento: box['id_apartamento'],
    bloco: box['bloco'],
    numeracao: box['numeracao'],
    idVeiculo: box['id_veiculo'],
    idMorador: box['id_morador'],
    placa: box['placa'],
    modelo: box['modelo'],
    cor: box['cor'],
    criadoEm: box['criado_em']
  })));
  if (!result.success) {
    alert(result.message);
  }
  return boxes;
}

export default {
    listarTodos,
    listarPorApartamento
};