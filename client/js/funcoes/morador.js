import Morador from '../../models/Morador.js';

const urlBase = 'http://localhost:3000';

async function listarTodos() {
    const response = await fetch(`${urlBase}/morador`);
    const result = await response.json();
    const moradoresJson = result.data;
    let moradores = [];
    moradoresJson.forEach(morador => moradores.push(new Morador({
        idMorador: morador['id_morador'],
        idApartamento: morador['id_apartamento'],
        nome: morador['nome'],
        telefone: morador['telefone'],
        email: morador['email'],
        status: morador['status'],
        criadoEm: morador['criado_em'],
        bloco: morador['bloco'],
        numeracao: morador['numeracao'],
    })));
    if (!result.success) {
        alert(result.message);
    }
    return moradores;
}

async function listarPorApartamento(idApartamento) {
    const response = await fetch(`${urlBase}/morador/listarPorApartamento/${idApartamento}`);
    const result = await response.json();
    const moradoresJson = result.data;
    let moradores = [];
    moradoresJson.forEach(morador => moradores.push(new Morador({
        idMorador: morador['id_morador'],
        idApartamento: morador['id_apartamento'],
        nome: morador['nome'],
        telefone: morador['telefone'],
        email: morador['email'],
        status: morador['status'],
        criadoEm: morador['criado_em'],
        bloco: morador['bloco'],
        numeracao: morador['numeracao'],
    })));
    if (!result.success) {
        alert(result.message);
    }
    return moradores;
}

async function listarPorNome(nome) {
    const response = await fetch(`${urlBase}/morador/listarPorNome/${nome}`);
    const result = await response.json();
    const moradoresJson = result.data;
    let moradores = [];
    moradoresJson.forEach(morador => moradores.push(new Morador({
        idMorador: morador['id_morador'],
        idApartamento: morador['id_apartamento'],
        nome: morador['nome'],
        telefone: morador['telefone'],
        email: morador['email'],
        status: morador['status'],
        criadoEm: morador['criado_em'],
        bloco: morador['bloco'],
        numeracao: morador['numeracao'],
    })));
    if (!result.success) {
        alert(result.message);
    }
    return moradores;
}

async function pesquisar(pesquisa) {
    const data = { pesquisa: pesquisa };
    const response = await fetch(`${urlBase}/morador/pesquisar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    const moradoresJson = result.data;
    let moradores = [];
    moradoresJson.forEach(morador => moradores.push(new Morador({
        idMorador: morador['id_morador'],
        idApartamento: morador['id_apartamento'],
        nome: morador['nome'],
        telefone: morador['telefone'],
        email: morador['email'],
        status: morador['status'],
        criadoEm: morador['criado_em'],
        bloco: morador['bloco'],
        numeracao: morador['numeracao'],
    })));
    if (!result.success) {
        alert(result.message);
    }
    return moradores;
}

export default {
    listarTodos,
    listarPorApartamento,
    listarPorNome,
    pesquisar
};