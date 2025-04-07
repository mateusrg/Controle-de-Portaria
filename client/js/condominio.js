// Imports

import Apartamento from '../models/Apartamento.js';
import Box from '../models/Box.js';
import Morador from '../models/Morador.js';
import Veiculo from '../models/Veiculo.js';

import Apartamentos from './funcoes/apartamento.js';
import Boxes from './funcoes/box.js';
import Moradores from './funcoes/morador.js';
import Veiculos from './funcoes/veiculo.js';

// Condomínio

// Listagem

// // Listagem de apartamentos
export async function mostrarSection(bloco) {
    const apartamentos = document.getElementById("div-apartamento");
    const titulo = document.getElementById("titulo-apartamento");
    const secaoApartamento = document.getElementById("secao-apartamento");
    const secaoMaior = document.getElementById("secao-lista-maior");
    const secaoMenor = document.getElementById("secao-lista-menor");
    if (bloco == "A" || bloco == "F") {
        secaoMaior.style.display = "grid";
        secaoMenor.style.display = "none";
        secaoApartamento.style.width = "25vw";
        const apartamentos = await Apartamentos.listarPorBloco(bloco);
        apartamentos.forEach(apartamento => {
            const botao = document.createElement("button");
            botao.classList.add("botao-apartamento");
            botao.id = `apto${apartamento.numeracao}-maior`;
            botao.textContent = apartamento.numeracao;
            botao.onclick = () => mostrarModal(apartamento.idApartamento, apartamento.bloco, apartamento.numeracao);

            secaoMaior.appendChild(botao);
        });
    } else {
        secaoMaior.style.display = "none";
        secaoMenor.style.display = "grid";
        secaoApartamento.style.width = "20vw";
        const apartamentos = await Apartamentos.listarPorBloco(bloco);
        apartamentos.forEach(apartamento => {
            const botao = document.createElement("button");
            botao.classList.add("botao-apartamento");
            botao.id = `apto${apartamento.numeracao}-menor`;
            botao.textContent = apartamento.numeracao;
            botao.onclick = () => mostrarModal(apartamento.idApartamento, apartamento.bloco, apartamento.numeracao);

            secaoMenor.appendChild(botao);
        });
    }
    apartamentos.style.display = "none";
    apartamentos.style.display = "flex";
    titulo.textContent = `Apartamentos Bloco ${bloco}`;
}

// // Evento para os blocos
document.getElementById("bloco-1").addEventListener("click", () => mostrarSection('A'));
document.getElementById("bloco-2").addEventListener("click", () => mostrarSection('B'));
document.getElementById("bloco-3").addEventListener("click", () => mostrarSection('C'));
document.getElementById("bloco-4").addEventListener("click", () => mostrarSection('D'));
document.getElementById("bloco-5").addEventListener("click", () => mostrarSection('E'));
document.getElementById("bloco-6").addEventListener("click", () => mostrarSection('F'));

// Navegação

// // Botão para abrir modal de moradores
export async function mostrarModal(apartamento, bloco, numeracao) {
    const blur = document.getElementById("blur");
    const modalLista = document.getElementById("modal-lista");
    const tituloLista = document.getElementById("modal-titulo-lista");
    const modalVazio = document.getElementById("modal-vazio");
    const botaoCadastrar = document.getElementById("modal-concluir-lista");
    modalLista.style.display = "none";
    blur.style.display = "none";
    modalLista.style.display = "flex";
    blur.style.display = "flex";
    tituloLista.textContent = `Moradores #${bloco}${numeracao}`;
    
    const listaMoradores = document.getElementById("lista-moradores");
    listaMoradores.innerHTML = "";

    const moradores = await Moradores.listarPorApartamento(apartamento);
    botaoCadastrar.onclick = () => cadastrarMorador(apartamento, bloco, numeracao);

    if (moradores.length == 0) {
        modalVazio.style.display = "flex";
    } else {
        modalVazio.style.display = "none";
        moradores.forEach(morador => {
            const card = document.createElement("div");
            card.classList.add("card-morador");
    
            let imagemSrc = "";
            switch (morador.status) {
                case "Proprietário":
                    imagemSrc = "../assets/chave.png";
                    break;
                case "Residente":
                    imagemSrc = "../assets/casa.png";
                    break;
                case "Visitante":
                    imagemSrc = "../assets/morador.png";
                    break;
            };
    
            const data = new Date(morador.criadoEm).toLocaleDateString("pt-BR");
    
            card.innerHTML = `
            <div class="card-div-titulo">
                <div class="card-div-imagem">
                    <img class="card-imagem" src="${imagemSrc}" alt="Morador">
                </div>
                <h4 class="card-titulo">${morador.nome}</h4>
            </div>
            <div class="card-informacoes">
                <p class="card-texto">TELEFONE: ${morador.telefone}</p>
                <p class="card-texto">EMAIL: ${morador.email}</p>
                <p class="card-texto">STATUS: ${morador.status}</p>
                <p class="card-texto">DATA DE ENTRADA: ${data}</p>
            </div>
            <div class="card-buttons">
                <button onclick="editarMorador(${morador.idMorador}, ${morador.idApartamento}, '${bloco}', '${numeracao}')" class="card-editar">EDITAR</button>
                <button onclick="excluirMorador(${morador.idMorador}, ${morador.idApartamento})" class="card-excluir">EXCLUIR</button>
            </div>
            `;
    
            listaMoradores.appendChild(card);
        });
    }
}

// // Botão para fechar lista de moradores
document.getElementById("fechar-modal-lista").addEventListener("click", () => {
    const blur = document.getElementById("blur");
    const modalLista = document.getElementById("modal-lista");
    modalLista.style.display = "none";
    blur.style.display = "none";
})

// // Botão para fechar cadastro de moradores
document.getElementById("fechar-modal-cadastro").addEventListener("click", () => {
    const modalLista = document.getElementById("modal-lista");
    const modalCadastro = document.getElementById("modal-cadastro");
    modalLista.style.display = "flex";
    modalCadastro.style.display = "none";
})

// // Blur
document.getElementById("blur").addEventListener("click", () => {
    const blur = document.getElementById("blur");
    const modalLista = document.getElementById("modal-lista");
    const modalCadastro = document.getElementById("modal-cadastro");
    if (modalLista.style.display == "flex") {
        modalLista.style.display = "none";
        blur.style.display = "none";
    } else {
        modalCadastro.style.display = "none";
        modalLista.style.display = "flex";
    }
})

// // Botão de cancelar do cadastro de moradores
document.getElementById("modal-concluir-cadastro-cancelar").addEventListener("click", () => {
    const modalLista = document.getElementById("modal-lista");
    const modalCadastro = document.getElementById("modal-cadastro");
    modalCadastro.style.display = "none";
    modalLista.style.display = "flex";
})

// // Botão para abrir cadastro de moradores
export function cadastrarMorador(apartamento, bloco, numeracao) {
    const modalLista = document.getElementById("modal-lista");
    const modalCadastro = document.getElementById("modal-cadastro");
    const tituloCadastro = document.getElementById("modal-titulo-cadastro");
    modalCadastro.style.display = "none";
    modalLista.style.display = "none";
    modalCadastro.style.display = "flex";
    tituloCadastro.textContent = `Cadastrar Morador #${bloco}${numeracao}`;

    const nome = document.getElementById("nome");
    const telefone = document.getElementById("telefone");
    const email = document.getElementById("email");
    const status = document.getElementById("status");

    nome.value = "";
    telefone.value = "";
    email.value = "";
    status.value = "";

    const data = document.getElementById("data");
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataHoje = `${ano}-${mes}-${dia}`;
    data.value = dataHoje;

    const botaoCadastrar = document.getElementById("modal-concluir-cadastro-salvar");
    botaoCadastrar.onclick = () => cadastro(apartamento, bloco, numeracao);
    botaoCadastrar.textContent = "CADASTRAR";
}

// Botão para abrir edição de moradores
export async function editarMorador(idMorador, idApartamento, bloco, numeracao) {
    const modalLista = document.getElementById("modal-lista");
    const modalCadastro = document.getElementById("modal-cadastro");
    const tituloCadastro = document.getElementById("modal-titulo-cadastro");
    modalCadastro.style.display = "none";
    modalLista.style.display = "none";
    modalCadastro.style.display = "flex";
    tituloCadastro.textContent = `Editar Morador #${bloco}${numeracao}`;

    const nome = document.getElementById("nome");
    const telefone = document.getElementById("telefone");
    const email = document.getElementById("email");
    const status = document.getElementById("status");
    const data = document.getElementById("data");

    const morador = await Morador.selecionarPorId(idMorador);

    const dataMorador = new Date(morador.criadoEm);
    const ano = dataMorador.getFullYear();
    const mes = String(dataMorador.getMonth() + 1).padStart(2, '0');
    const dia = String(dataMorador.getDate()).padStart(2, '0');
    const dataMoradorAjustada = `${ano}-${mes}-${dia}`;

    nome.value = morador.nome;
    telefone.value = morador.telefone;
    email.value = morador.email;
    status.value = morador.status;
    data.value = dataMoradorAjustada;

    const botaoCadastrar = document.getElementById("modal-concluir-cadastro-salvar");
    botaoCadastrar.onclick = () => edicao(idMorador, idApartamento, bloco, numeracao);
    botaoCadastrar.textContent = "SALVAR";
}

// Cadastrar e Editar

// // Cadastro de moradores
export async function cadastro(idApartamento, bloco, numeracao) {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const status = document.getElementById("status").value;
    const criadoEm = document.getElementById("data").value;

    const moradores = await Moradores.listarPorApartamento(idApartamento);

    const verificacaoProprietario = moradores.some(morador => morador.status === "Proprietário");

    if (status === "Proprietário" && verificacaoProprietario) {
        alert("O apartamento não pode possuir mais de um proprietário");
        return;
    };
    
    const morador = await Morador.cadastrar(idApartamento, nome, telefone, email, status, criadoEm);

    const modalCadastro = document.getElementById("modal-cadastro");
    modalCadastro.style.display = "none";
    mostrarModal(idApartamento, bloco, numeracao);
}

// Edição de moradores
export async function edicao(idMorador, idApartamento, bloco, numeracao) {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const status = document.getElementById("status").value;
    const criadoEm = document.getElementById("data").value;

    const moradores = await Moradores.listarPorApartamento(idApartamento);

    const moradorSelecionado = await Morador.selecionarPorId(idMorador);

    const outroProprietario = moradores.find(morador =>
        morador.status === "Proprietário" && morador.idMorador !== idMorador
    );

    if (status === "Proprietário" && outroProprietario) {
        alert("O apartamento não pode possuir mais de um proprietário");
        return;
    }
    
    const moradorEditado = await moradorSelecionado.editar(idApartamento, nome, telefone, email, status, criadoEm);

    const modalCadastro = document.getElementById("modal-cadastro");
    modalCadastro.style.display = "none";
    mostrarModal(idApartamento, bloco, numeracao);
}

// Exclusão

// Remoção de moradores
export async function excluirMorador(idMorador, idApartamento) {
    const moradorSelecionado = await Morador.selecionarPorId(idMorador);
    const apartamento = await Apartamento.selecionarPorId(idApartamento);
    await moradorSelecionado.deletar();
    mostrarModal(apartamento.idApartamento, apartamento.bloco, apartamento.numeracao);
}

// Events
window.editarMorador = editarMorador;
window.excluirMorador = excluirMorador;