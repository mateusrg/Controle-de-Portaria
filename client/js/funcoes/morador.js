const urlBase = 'http://localhost:3000';

async function listarTodos() {
    const response = await fetch(`${urlBase}/morador`);
    const result = await response.json();
    const moradores = result.data;
    if (!result.success) {
        alert(result.message);
    }
    return moradores;
}

async function selecionarPorId(idMorador) {
    const response = await fetch(`${urlBase}/morador/selecionarPorId/${idMorador}`);
    const result = await response.json();
    const apartamento = result.data;
    if (!result.success) {
        alert(result.message);
    }
    return apartamento;
}

async function listarPorApartamento(idApartamento) {
    const response = await fetch(`${urlBase}/morador/listarPorApartamento/${idApartamento}`);
    const result = await response.json();
    const moradores = result.data;
    if (!result.success) {
        alert(result.message);
    }
    return moradores;
}

async function listarPorNome(nome) {
    const response = await fetch(`${urlBase}/morador/listarPorNome/${nome}`);
    const result = await response.json();
    const moradores = result.data;
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
    const moradores = result.data;
    if (!result.success) {
        alert(result.message);
    }
    return moradores;
}

export {
    listarTodos,
    selecionarPorId,
    listarPorApartamento,
    listarPorNome,
    pesquisar
};