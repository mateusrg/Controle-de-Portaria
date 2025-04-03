import Apartamento from '../../models/Apartamento.js';

const urlBase = 'http://localhost:3000';

async function listarTodos() {
  const response = await fetch(`${urlBase}/apartamento`);
  const result = await response.json();
  let apartamentosJson = result.data;
  let apartamentos = [];
  apartamentosJson.forEach(ap => apartamentos.push(new Apartamento({
    idApartamento: ap['id_apartamento'],
    bloco: ap['bloco'],
    numeracao: ap['numeracao']
  })));
  if (!result.success) {
    alert(result.message);
  }
  return apartamentos;
}

async function listarPorBloco(bloco) {
  const response = await fetch(`${urlBase}/apartamento/listarPorBloco/${bloco}`);
  const result = await response.json();
  const apartamentosJson = result.data;
  let apartamentos = [];
  apartamentosJson.forEach(ap => apartamentos.push(new Apartamento({
    idApartamento: ap['id_apartamento'],
    bloco: ap['bloco'],
    numeracao: ap['numeracao']
  })));
  if (!result.success) {
    alert(result.message);
  }
  return apartamentos;
}

async function listarPorNumeracao(numeracao) {
  const response = await fetch(`${urlBase}/apartamento/listarPorNumeracao/${numeracao}`);
  const result = await response.json();
  const apartamentosJson = result.data;
  let apartamentos = [];
  apartamentosJson.forEach(ap => apartamentos.push(new Apartamento({
    idApartamento: ap['id_apartamento'],
    bloco: ap['bloco'],
    numeracao: ap['numeracao']
  })));
  if (!result.success) {
    alert(result.message);
  }
  return apartamentos;
}

export default {
  listarTodos,
  listarPorBloco,
  listarPorNumeracao
};