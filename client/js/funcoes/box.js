const urlBase = 'http://localhost:3000';

async function listarTodos() {
  const response = await fetch(`${urlBase}/box`);
  const result = await response.json();
  const boxes = result.data;
  if (!result.success) {
    alert(result.message);
  }
  return boxes;
}

async function selecionarPorId(idBox) {
  const response = await fetch(`${urlBase}/box/selecionarPorId/${idBox}`);
  const result = await response.json();
  const apartamento = result.data;
  if (!result.success) {
    alert(result.message);
  }
  return apartamento;
}

async function listarPorApartamento(idApartamento) {
  const response = await fetch(`${urlBase}/box/listarPorApartamento/${idApartamento}`);
  const result = await response.json();
  const boxes = result.data;
  if (!result.success) {
    alert(result.message);
  }
  return boxes;
}

export {
    listarTodos,
    selecionarPorId,
    listarPorApartamento
};