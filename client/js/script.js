// Imports

import Apartamento from '../models/Apartamento.js';
import Box from '../models/Box.js';
import Morador from '../models/Morador.js';
import Veiculo from '../models/Veiculo.js';

import Apartamentos from './funcoes/apartamento.js';
import Boxes from './funcoes/box.js';
import Moradores from './funcoes/morador.js';
import Veiculos from './funcoes/veiculo.js';

// Listagem

// // Parâmetros da listagem de vagas
let mostrandoVagas = false;
const inicioVagas = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
};
// // Listagem de vagas
export async function mostrarVagas() {
  if (mostrandoVagas) return;
  mostrandoVagas = true;

  const listaVagasA = document.getElementById("bloco-a");
  const listaVagasB = document.getElementById("bloco-b");
  const listaVagasC = document.getElementById("bloco-c");
  const listaVagasD = document.getElementById("bloco-d");
  const listaVagasE = document.getElementById("bloco-e");
  const listaVagasF = document.getElementById("bloco-f");

  const boxes = await Boxes.listarTodos();

  listaVagasA.innerHTML = '';
  listaVagasB.innerHTML = '';
  listaVagasC.innerHTML = '';
  listaVagasD.innerHTML = '';
  listaVagasE.innerHTML = '';
  listaVagasF.innerHTML = '';

  const larguraTela = window.innerWidth;
  const vagasPorTela = Math.max(3, Math.floor(larguraTela / 160));

  const blocos = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
  };

  boxes.forEach(box => {
    blocos[box.bloco].push(box);
  });

  for (const bloco in blocos) {
    const lista = blocos[bloco];
    const inicio = inicioVagas[bloco] * vagasPorTela;
    const final = inicio + vagasPorTela;
    const vagasVisiveis = lista.slice(inicio, final);

    const secao = document.getElementById(`bloco-${bloco.toLowerCase()}`);
    secao.innerHTML = "";

    for (const box of vagasVisiveis) {
      const veiculo = await Veiculo.selecionarPorBox(box.idBox);

      const divBox = document.createElement("div");
      divBox.classList.add("vaga");

      if (veiculo != null) {
        divBox.style.cursor = "grab";
        permitirRemocaoPorArrasto(divBox, veiculo.idVeiculo);

        divBox.style.backgroundColor = "#f9ccbe";

        const numeracao = document.createElement('p');
        numeracao.classList.add('texto-vaga-ocupada');
        numeracao.textContent = `${box.bloco}${box.numeracao}`;
        divBox.appendChild(numeracao);

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('carro');
        svg.setAttribute('viewBox', '0 0 86 184');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M79.92 70.05c-.38 0-.38 0-.76 0 .38-31.83 8.72-63.02-27.31-66.81l.76 2.65c-6.83.76-13.66.76-21.25-.76l.76-2.65c-2.65.38-8.72 1.91-9.48 2.65-5.31 1.9-9.48 5.31-11.38 8.34C7.09 18.89 2.92 32.91 5.58 47.69c.38 1.14.38 11.75.76 22.74-2.28.38-4.15 2.65-4.15 4.91 0 .38.38.76.76.76l3.04-1.14c0 .38.76 80.36 1.14 82.26 1.52 6.44 3.04 12.88 3.42 14.78 0 1.14 1.9 4.91 8.34 7.58 9.86 5.68 40.58 5.68 50.04-2.28 5.69-4.15 4.15-4.54 8.34-20.92 1.52-6.44.76-11.75 1.14-82.91l4.55 1.52c.38 0 .76-.38.76-.76 1.14-2.28-1.14-4.55-3.8-4.91ZM72.33 14.72c.38 0 1.52 0 1.14 0 1.9 0 .76 2.65 1.14 5.69v.76s-.38-.38-.76-.76c-.76-.76-1.9-2.28-3.04-3.04.76-1.14 0-3.04 1.52-3.04Zm-5.31-4.15c0-1.52 1.9-1.14 2.28-1.14 1.9 0 .76 2.65 1.14 7.2-1.14-.76-2.65-3.04-3.42-4.55V10.57ZM16.2 9.42c.38 0 1.9-.38 1.9 1.14v1.14c-.76 1.52-2.28 3.8-3.42 4.55.38-4.55-.76-7.2 1.52-7.2Zm-1.9 6.44v1.52c-.76.76-1.9 2.28-3.04 3.04-.38 0-.38.38-.76.38v-4.91c.38-1.52 3.8-1.52 3.8 0ZM15.82 118.18c-.38 14.02-3.8 21.58-3.8 21.58-.76-9.86-1.14-20.36-1.14-30.94l.38-.38 4.91 2.65c-.38 2.28-.38 4.55-.38 7.09ZM11.26 107.95l-.38.38c-.38-11.75-.38-23.87-.38-36.02 0-.76 0-1.52 0-2.28 0-3.04 0-6.08 0-9.1 1.14 9.48 4.91 10.99 5.31 49.05l-4.55-2.65ZM12.02 53.76v-.38c15.55-14.02 52.72-8.72 60.3-.76 4.55 7.2-3.42 26.94-3.8 29.26-.38.76-.38 1.14-2.65.76-3.42-.38-12.49-2.65-23.11-3.42-10.24-.76-22.75 2.65-25.03 3.42-.76.38-1.52 2.65-5.31-27.88Zm53.48 49.26c.38 2.27-1.14 4.55-3.42 4.55H24.16c-2.27 0-3.8-1.9-3.42-4.55l1.9-12.88c.38-1.9 1.9-3.42 3.8-3.42h32.99c1.9 0 3.8 1.52 3.8 3.42l2.27 12.88ZM64.75 165.56c-9.86 5.69-33.38 5.69-42.48 0-2.27-1.52-4.15-3.42-4.15-6.08l.76-20.46c.38-1.52 1.14-2.27 2.65-1.9 15.55 4.15 31.86 3.8 44.75 0 1.9 0 2.65.76 2.65 1.9 0 .38.76 21.23.38 20.46-.38 2.65-2.27 4.55-4.91 6.08ZM74.99 139.41s-3.8-7.58-3.8-21.6c0-2.27 0-4.55 0-7.2l4.91-2.27.38.38c-.76 10.62-1.14 20.89-1.52 30.69Zm.76-31.46-4.93 2.27c.38-39.04 3.8-39.43 5.31-49.05 0 3.04 0 6.08 0 9.48v2.28c.38 11.75 0 23.49-.38 35.02Z');
        path.setAttribute('fill', `${veiculo.cor}`);
        svg.appendChild(path);
        divBox.appendChild(svg);

        const placa = document.createElement('p');
        placa.classList.add('texto-placa');
        placa.textContent = `${veiculo.placa}`;
        divBox.appendChild(placa);
      } else {
        divBox.onclick = () => listarVeiculos(box.idBox, box.bloco, box.numeracao);
        const texto = document.createElement("p");
        texto.className = "texto-vaga-desocupada";
        texto.textContent = `${box.bloco}${box.numeracao}`;
        divBox.appendChild(texto);
      }

      secao.appendChild(divBox);
    };

    // Setas

    const totalVagas = blocos[bloco].length;
    const totalPaginas = Math.ceil(totalVagas / vagasPorTela);
    const paginaAtual = inicioVagas[bloco];

    const setaVolta = document.querySelector(`.seta-volta.bloco-${bloco.toLowerCase()}`);
    const setaProximo = document.querySelector(`.seta-proximo.bloco-${bloco.toLowerCase()}`);

    if (paginaAtual === 0) {
      setaVolta.style.visibility = "hidden";
    } else {
      setaVolta.style.visibility = "visible";
    }

    if (paginaAtual >= totalPaginas - 1) {
      setaProximo.style.visibility = "hidden";
    } else {
      setaProximo.style.visibility = "visible";
    }

    setaVolta.onclick = () => {
      if (inicioVagas[bloco] > 0) {
        inicioVagas[bloco]--;
        mostrarVagas();
      }
    };

    setaProximo.onclick = () => {
      if (inicioVagas[bloco] < totalPaginas - 1) {
        inicioVagas[bloco]++;
        mostrarVagas();
      }
    };

  }
  mostrandoVagas = false;
}

// // Parâmetros da listagem de veículos para estacionar
let thereVeiculo;
let idBoxSelecionado;
let blocoSelecionado;
let numeracaoSelecionado;
// // Listagem de veículos para estacionar
export async function listarVeiculos(idBox, bloco, numeracao) {
  idBoxSelecionado = idBox;
  blocoSelecionado = bloco;
  numeracaoSelecionado = numeracao;

  const blur = document.getElementById("blur");
  const modalTela = document.getElementById("modal-tela");
  const listaVeiculos = document.getElementById("lista-veiculos");
  const listaVazia = document.getElementById("lista-vazia");
  modalTela.style.display = "flex";
  blur.style.display = "flex";
  blur.style.zIndex = "2";
  document.body.style.overflow = 'hidden';

  listaVeiculos.innerHTML = "";

  const veiculos = await Veiculos.listarTodos();
  if (veiculos.length == 0) {
    listaVazia.style.display = "flex";
    thereVeiculo = false;
  } else {
    listaVazia.style.display = "none";
    veiculos.forEach(veiculo => {
      const carro = document.createElement("div");
      carro.classList.add("veiculo");
      carro.onclick = () => estacionarVeiculo(veiculo.id_veiculo, idBox);

      carro.innerHTML = `
        <div class="modal-div-imagem">
          <img class="modal-imagem" src="../assets/carro.png" alt="Carro">
        </div>
        <div class="modal-div-info">
          <h6 class="modal-titulo-carro">${veiculo.modelo}</h6>
          <p class="modal-info-carro">${veiculo.placa}</p>
          <div class="modal-div-cor">
            <p class="modal-info-carro">Cor</p>
            <input class="modal-input-cor-lista" type="color" value="${veiculo.cor}" disabled>
          </div>
        </div>
        <div class="modal-div-opcoes">
          <img onclick="editarVeiculo(event, ${veiculo.id_veiculo}, ${idBox})" class="modal-editar" src="../assets/editar.png" alt="Editar">
          <img onclick="excluirVeiculo(event, ${veiculo.id_veiculo}, ${idBox}, '${bloco}', ${numeracao})" class="modal-excluir" src="../assets/excluir.png" alt="Excluir">
        </div>
        `;

      listaVeiculos.appendChild(carro);
    });
    thereVeiculo = true;
  }
}

// // Listagem de moradores para designar ao carro
document.getElementById("nome").addEventListener("click", async () => {
  const blur = document.getElementById("blur");
  const modalTela = document.getElementById("modal-tela");
  const modalCadastro = document.getElementById("modal-cadastro");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalBotao = document.getElementById("modal-botao-cadastrar");
  const modalPesquisa = document.getElementById("modal-pesquisa");
  const listaMoradores = document.getElementById("lista-moradores");
  const listaVeiculos = document.getElementById("lista-veiculos");
  const listaVazia = document.getElementById("lista-vazia");
  modalCadastro.style.display = "none";
  modalTela.style.display = "flex";
  modalBotao.style.display = "none";
  modalPesquisa.style.display = "flex";
  blur.style.zIndex = "2";
  modalTitulo.textContent = "Selecionar Dono";
  listaVeiculos.style.display = "none";
  listaVazia.style.display = "none";
  listaMoradores.style.display = "flex";

  const moradores = await Moradores.listarTodos();
  listaMoradores.innerHTML = "";

  moradores.forEach(morador => {
    const pessoa = document.createElement("div");
    pessoa.classList.add("morador");
    pessoa.onclick = () => selecionarMorador(morador.idMorador);

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

    pessoa.innerHTML = `
    <div class="morador-div-imagem">
      <img class="morador-imagem" src="${imagemSrc}" alt="Morador">
    </div>
    <div class="morador-div-info">
      <h6 class="morador-titulo-nome">${morador.nome} - ${morador.status}</h6>
      <p class="morador-info">${morador.telefone}</p>
      <p class="morador-info">${morador.email}</p>
    </div>
    <div id="morador-div-ap">
      <p class="morador-info-ap">Bloco ${morador.bloco}</p>
      <p class="morador-info-ap">Apartamento ${morador.numeracao}</p>
    </div>
    `;

    listaMoradores.appendChild(pessoa);
  });
})

// // Estacionar veículo
async function estacionarVeiculo(idVeiculo, idBox) {
  const veiculoEstacionar = await Veiculo.selecionarPorId(idVeiculo);
  await veiculoEstacionar.setIdBox(idBox);

  const modalTela = document.getElementById("modal-tela");
  const blur = document.getElementById("blur");
  modalTela.style.display = "none";
  blur.style.display = "none";

  mostrarVagas();
}

// Formatação e Pesquisa

// // Evento para formatar placa do veículo
document.getElementById("placa").addEventListener("input", () => {
  formatarPlaca(document.getElementById("placa"));
});
// // Função para formatar placa do veículo
export function formatarPlaca(input) {
  let valor = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  valor = valor.toUpperCase();
  input.value = valor.slice(0, 7);
}

// // Evento para barra de pesquisa
document.getElementById("modal-pesquisa").addEventListener("input", () => {
  const inputPesquisa = document.getElementById("modal-pesquisa");
  const termo = inputPesquisa.value;
  renderizarMoradores(termo);
});
// // Função para barra de pesquisa
async function renderizarMoradores(filtro = "") {
  const listaMoradores = document.getElementById("lista-moradores");
  listaMoradores.innerHTML = "";

  const termo = filtro.toLowerCase();

  const moradores = await Moradores.listarTodos();

  const moradoresFiltrados = moradores.filter(morador =>
    morador.nome.toLowerCase().includes(termo) ||
    morador.status.toLowerCase().includes(termo) ||
    morador.email.toLowerCase().includes(termo) ||
    morador.telefone.toLowerCase().includes(termo) ||
    morador.bloco.toLowerCase().includes(termo) ||
    String(morador.numeracao).toLowerCase().includes(termo)
  );

  moradoresFiltrados.forEach(morador => {
    const pessoa = document.createElement("div");
    pessoa.classList.add("morador");
    pessoa.onclick = () => selecionarMorador(morador.idMorador);

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
    }

    pessoa.innerHTML = `
      <div class="morador-div-imagem">
        <img class="morador-imagem" src="${imagemSrc}" alt="Morador">
      </div>
      <div class="morador-div-info">
        <h6 class="morador-titulo-nome">${morador.nome} - ${morador.status}</h6>
        <p class="morador-info">${morador.telefone}</p>
        <p class="morador-info">${morador.email}</p>
      </div>
      <div id="morador-div-ap">
        <p class="morador-info-ap">Bloco ${morador.bloco}</p>
        <p class="morador-info-ap">Apartamento ${morador.numeracao}</p>
      </div>
    `;

    listaMoradores.appendChild(pessoa);
  });
}

// Cadastro e Edição

// // Cadastro de veículos
async function cadastrarVeiculo () {
  const idMorador = document.getElementById("id").value;
  const placa = document.getElementById("placa").value.toUpperCase();
  const modelo = document.getElementById("modelo").value;
  const cor = document.getElementById("cor").value;
  const data = document.getElementById("data").value;

  const veiculoCadastrado = await Veiculo.cadastrar(idMorador, null, placa, modelo, cor, data);

  const modalCadastro = document.getElementById("modal-cadastro");
  const blur = document.getElementById("blur");
  modalCadastro.style.display = "none";
  blur.style.zIndex = "2";
  listarVeiculos(idBoxSelecionado, blocoSelecionado, numeracaoSelecionado);
}

// // Edição de veículos
async function edicao (idVeiculo, idBox) {
  const id = document.getElementById("id").value;
  const placa = document.getElementById("placa").value;
  const modelo = document.getElementById("modelo").value;
  const cor = document.getElementById("cor").value;
  const data = document.getElementById("data").value;

  const veiculoEditar = await Veiculo.selecionarPorId(idVeiculo);
  await veiculoEditar.editar(id, idBox, placa, modelo, cor, data);

  const modalTela = document.getElementById("modal-tela");
  const modalCadastro = document.getElementById("modal-cadastro");
  const blur = document.getElementById("blur");
  console.log("Foi")
  console.log(modalTela)
  modalTela.style.display = "none";
  modalCadastro.style.display = "none";
  blur.style.zIndex = "2";
  blur.style.display = "none";
  mostrarVagas();
}

// Exclusão

// Remoção de veículo da vaga
function permitirRemocaoPorArrasto(carro, idVeiculo) {
  let arrastando = false;
  let comecoY = 0;

  carro.style.cursor = "grab";

  carro.addEventListener("click", (e) => {
    if (!arrastando) {
      arrastando = true;
      comecoY = e.clientY;
      carro.style.cursor = "grabbing";
      carro.style.transition = "none";
    } else {
      arrastando = false;
      carro.style.transform = "translateY(0px)";
      carro.style.cursor = "grab";
      carro.style.backgroundColor = "#f9ccbe";
    }
  });

  document.addEventListener("mousemove", async (moveEvent) => {
    if (!arrastando) return;

    const distancia = moveEvent.clientY - comecoY;
    if (distancia < 0) return;
    carro.style.transform = `translateY(${distancia}px)`;

    if (distancia > 40) carro.style.backgroundColor = "#f9ccbe";
    if (distancia > 60) carro.style.backgroundColor = "#FDDCD2";
    if (distancia > 80) carro.style.backgroundColor = "#D0EBCA";
    if (distancia > 120) {
      carro.style.backgroundColor = "#c6eabf";

      const veiculo = await Veiculo.selecionarPorId(idVeiculo);
      await veiculo.setIdBox(null);
      arrastando = false;
      mostrarVagas();
    }
  });

  document.addEventListener("click", (e) => {
    if (arrastando && !carro.contains(e.target)) {
      arrastando = false;
      carro.style.transform = "translateY(0px)";
      carro.style.cursor = "grab";
      carro.style.backgroundColor = "#f9ccbe";
    }
  });
}

// // Exclusão de veículo
export async function excluirVeiculo (event, idVeiculo, idBox, bloco, numeracao) {
  event.stopPropagation();

  const veiculo = await Veiculo.selecionarPorId(idVeiculo);
  console.log(veiculo)
  await veiculo.deletar();
  console.log(veiculo)

  listarVeiculos(idBox, bloco, numeracao);
}

// Navegação

// // Blur
document.getElementById("blur").addEventListener("click", () => {
  const blur = document.getElementById("blur");
  const modalTela = document.getElementById("modal-tela");
  const modalCadastro = document.getElementById("modal-cadastro");
  const listaMoradores = document.getElementById("lista-moradores");
  const listaVeiculos = document.getElementById("lista-veiculos");
  const listaVazia = document.getElementById("lista-vazia");
  const botaoCadastrar = document.getElementById("modal-botao-cadastrar");
  const barraPesquisa = document.getElementById("modal-pesquisa");
  const modalTitulo = document.getElementById("modal-titulo");
  if (modalTela.style.display == "flex" && modalCadastro.style.display == "none") {
    if (listaMoradores.style.display == "flex") {
      listaMoradores.style.display = "none";
      botaoCadastrar.style.display = "flex";
      barraPesquisa.style.display = "none";
      modalTitulo.textContent = "Estacionar Carro"
      modalCadastro.style.display = "flex";
      blur.style.zIndex = "4";
      if (thereVeiculo) {
        listaVeiculos.style.display = "flex";
      } else {
        listaVazia.style.display = "flex";
      }
    } else {
      modalTela.style.display = "none";
      blur.style.display = "none";
      document.body.style.overflow = 'auto';
      mostrarVagas();
    }
  } else {
    modalCadastro.style.display = "none";
    modalTela.style.display = "flex";
    blur.style.zIndex = "2";
  }
})

// // Seta Modal
document.getElementById("modal-seta-volta").addEventListener("click", () => {
  const blur = document.getElementById("blur");
  const modalTela = document.getElementById("modal-tela");
  const modalCadastro = document.getElementById("modal-cadastro");
  const listaMoradores = document.getElementById("lista-moradores");
  const listaVeiculos = document.getElementById("lista-veiculos");
  const listaVazia = document.getElementById("lista-vazia");
  const botaoCadastrar = document.getElementById("modal-botao-cadastrar");
  const barraPesquisa = document.getElementById("modal-pesquisa");
  const modalTitulo = document.getElementById("modal-titulo");
  if (listaMoradores.style.display == "flex") {
    listaMoradores.style.display = "none";
    botaoCadastrar.style.display = "flex";
    barraPesquisa.style.display = "none";
    modalTitulo.textContent = "Estacionar Carro"
    modalCadastro.style.display = "flex";
    blur.style.zIndex = "4";
    if (thereVeiculo) {
      listaVeiculos.style.display = "flex";
    } else {
      listaVazia.style.display = "flex";
    }
  } else {
    modalTela.style.display = "none";
    blur.style.display = "none";
    document.body.style.overflow = 'auto';
  }
})

// // Botão selecionar morador
async function selecionarMorador(idMorador) {
  const blur = document.getElementById("blur");
  const modalCadastro = document.getElementById("modal-cadastro");
  const listaMoradores = document.getElementById("lista-moradores");
  const listaVeiculos = document.getElementById("lista-veiculos");
  const listaVazia = document.getElementById("lista-vazia");
  const botaoCadastrar = document.getElementById("modal-botao-cadastrar");
  const barraPesquisa = document.getElementById("modal-pesquisa");
  const modalTitulo = document.getElementById("modal-titulo");

  const morador = await Morador.selecionarPorId(idMorador);

  const id = document.getElementById("id");
  id.value = idMorador;
  const nome = document.getElementById("nome");
  nome.value = morador.nome;

  listaMoradores.style.display = "none";
  botaoCadastrar.style.display = "flex";
  barraPesquisa.style.display = "none";
  modalTitulo.textContent = "Estacionar Carro"
  modalCadastro.style.display = "flex";
  blur.style.zIndex = "4";
  if (thereVeiculo) {
    listaVeiculos.style.display = "flex";
  } else {
    listaVazia.style.display = "flex";
  }
}

// // Botão para cadastrar veículo
document.getElementById("modal-botao-cadastrar").addEventListener("click", () => {
  const blur = document.getElementById("blur");
  const modalCadastro = document.getElementById("modal-cadastro");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalBotao = document.getElementById("modal-botao-cadastrar");
  const modalPesquisa = document.getElementById("modal-pesquisa");
  const modalBotaoCadastro = document.getElementById("modal-concluir-cadastro-salvar");
  modalCadastro.style.display = "flex";
  modalBotao.style.display = "flex";
  modalPesquisa.style.display = "none";
  blur.style.zIndex = "4";
  modalTitulo.textContent = "Estacionar Carro";
  modalBotaoCadastro.textContent = "CADASTRAR";
  modalBotaoCadastro.removeEventListener("click", edicao);
  modalBotaoCadastro.addEventListener("click", () => cadastrarVeiculo());

  const nome = document.getElementById("nome");
  const id = document.getElementById("id");
  const placa = document.getElementById("placa");
  const modelo = document.getElementById("modelo");
  const cor = document.getElementById("cor");

  nome.value = "Selecione uma opção                                >";
  id.value = "";
  placa.value = "";
  modelo.value = "";
  cor.value = "";

  const data = document.getElementById("data");
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  const dataHoje = `${ano}-${mes}-${dia}`;
  data.value = dataHoje;
})

// // X para fechar modal de cadastro de veículo
document.getElementById("fechar-modal-cadastro").addEventListener("click", () => {
  const modalTela = document.getElementById("modal-tela");
  const modalCadastro = document.getElementById("modal-cadastro");
  const blur = document.getElementById("blur");
  modalTela.style.display = "flex";
  modalCadastro.style.display = "none";
  blur.style.zIndex = "2";
})

// // Botão de cancelar cadastro de veículo
document.getElementById("modal-concluir-cadastro-cancelar").addEventListener("click", () => {
  const modalTela = document.getElementById("modal-tela");
  const modalCadastro = document.getElementById("modal-cadastro");
  const blur = document.getElementById("blur");
  modalTela.style.display = "flex";
  modalCadastro.style.display = "none";
  blur.style.zIndex = "2";
})

// // Botão para chamar edição de veículos
export async function editarVeiculo (event, idVeiculo, idBox) {
  event.stopPropagation();

  const modalCadastro = document.getElementById("modal-cadastro");
  const blur = document.getElementById("blur");
  const modalBotao = document.getElementById("modal-concluir-cadastro-salvar");
  modalCadastro.style.display = "flex";
  blur.style.zIndex = "4";
  modalBotao.textContent = "SALVAR";
  modalBotao.removeEventListener("click", cadastrarVeiculo);
  modalBotao.addEventListener("click", () => edicao(idVeiculo, idBox));

  const veiculo = await Veiculo.selecionarPorId(idVeiculo);
  const morador = await Morador.selecionarPorId(veiculo.idMorador);

  const nome = document.getElementById("nome");
  const id = document.getElementById("id");
  const placa = document.getElementById("placa");
  const modelo = document.getElementById("modelo");
  const cor = document.getElementById("cor");
  const data = document.getElementById("data");

  nome.value = morador.nome;
  id.value = veiculo.idMorador;
  placa.value = veiculo.placa;
  modelo.value = veiculo.modelo;
  cor.value = veiculo.cor;
  
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  const dataHoje = `${ano}-${mes}-${dia}`;
  data.value = dataHoje;
}

// Events
document.addEventListener("DOMContentLoaded", mostrarVagas);
window.addEventListener('resize', mostrarVagas);

window.editarVeiculo = editarVeiculo;
window.excluirVeiculo = excluirVeiculo;