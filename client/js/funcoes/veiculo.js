import Veiculo from '../../models/Veiculo.js';

const urlBase = 'http://localhost:3000';

async function listarTodos() {
    const response = await fetch(`${urlBase}/veiculo`);
    const result = await response.json();
    const veiculos = result.data;
    if (!result.success) {
        alert(result.message);
    }
    return veiculos;
}

async function listarPorMorador(idMorador) {
    const response = await fetch(`${urlBase}/veiculo/listarPorMorador/${idMorador}`);
    const result = await response.json();
    const veiculos = result.data;
    if (!result.success) {
        alert(result.message);
    }
    return veiculos;
}

async function listarPorModelo(modelo) {
    const response = await fetch(`${urlBase}/veiculo/listarPorModelo/${modelo}`);
    const result = await response.json();
    const veiculos = result.data;
    if (!result.success) {
        alert(result.message);
    }
    return veiculos;
}

export {
    listarTodos,
    listarPorMorador,
    listarPorModelo
}