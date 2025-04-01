const urlBase = 'http://localhost:3000';

async function listarTodos() {
  const response = await fetch(`${urlBase}/apartamento`);
  const result = await response.json();
  const apartamentos = result.data;
  if (!result.success) {
    alert(result.message);
  }
  return apartamentos;
}

async function selecionarPorId(idApartamento) {
  const response = await fetch(`${urlBase}/apartamento/selecionarPorId/${idApartamento}`);
  const result = await response.json();
  const apartamento = result.data;
  if (!result.success) {
    alert(result.message);
  }
  return apartamento;
}

async function listarPorBloco(bloco) {
  const response = await fetch(`${urlBase}/apartamento/listarPorBloco/${bloco}`);
  const result = await response.json();
  const apartamentos = result.data;
  if (!result.success) {
    alert(result.message);
  }
  return apartamentos;
}

async function listarPorNumeracao(numeracao) {
  const response = await fetch(`${urlBase}/apartamento/listarPorNumeracao/${numeracao}`);
  const result = await response.json();
  const apartamentos = result.data;
  if (!result.success) {
    alert(result.message);
  }
  return apartamentos;
}

export {
  listarTodos,
  selecionarPorId,
  listarPorBloco,
  listarPorNumeracao
};