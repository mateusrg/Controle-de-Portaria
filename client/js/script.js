import Apartamento from '../models/Apartamento.js';
import Box from '../models/Box.js';
import Morador from '../models/Morador.js';
import Veiculo from '../models/Veiculo.js';

import Apartamentos from './funcoes/apartamento.js';
import Boxes from './funcoes/box.js';
import Moradores from './funcoes/morador.js';
import Veiculos from './funcoes/veiculo.js';

// Vagas

const inicioVagas = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
};

export async function mostrarVagas() {
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
      divBox.onclick = () => listarVeiculos(box.idBox, box.bloco, box.numeracao);

      if (veiculo != null) {
        divBox.style.backgroundColor = "#f9ccbe";

        const vaga = document.createElement('p');
        vaga.classList.add('texto-vaga-ocupada');
        vaga.textContent = `${box.bloco}${box.numeracao}`;
        divBox.appendChild(vaga);

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
}

export async function listarVeiculos (idBox, bloco, numeracao) {
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
  } else {
    listaVazia.style.display = "none";
    veiculos.forEach(veiculo => {
        const carro = document.createElement("div");
        carro.classList.add("veiculo");
        carro.draggable = true;

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
        <img onclick="editarVeiculo(${veiculo.id_veiculo})" class="modal-editar" src="../assets/editar.png" alt="Editar">
        `;

        listaVeiculos.appendChild(carro);
    });
  }
}

document.getElementById("fechar-modal-cadastro").addEventListener("click", () => {
  const modalTela = document.getElementById("modal-tela");
  const modalCadastro = document.getElementById("modal-cadastro");
  const blur = document.getElementById("blur");
  modalTela.style.display = "flex";
  modalCadastro.style.display = "none";
  blur.style.zIndex = "2";
})

document.getElementById("blur").addEventListener("click", () => {
  const blur = document.getElementById("blur");
  const modalTela = document.getElementById("modal-tela");
  const modalCadastro = document.getElementById("modal-cadastro");
  const listaMoradores = document.getElementById("lista-moradores");
  const listaVeiculos = document.getElementById("lista-veiculos");
  const botaoCadastrar = document.getElementById("modal-botao-cadastrar");
  const barraPesquisa = document.getElementById("modal-pesquisa");
  const modalTitulo = document.getElementById("modal-titulo");
  if (modalTela.style.display == "flex") {
    if (listaMoradores.style.display == "flex") {
      listaMoradores.style.display = "none";
      listaVeiculos.style.display = "flex";
      botaoCadastrar.style.display = "flex";
      barraPesquisa.style.display = "none";
      modalTitulo.textContent = "Estacionar Carro"
      modalCadastro.style.display = "flex";
    } else {
      modalTela.style.display = "none";
      blur.style.display = "none";
      document.body.style.overflow = 'auto';
    }
  } else {
      modalCadastro.style.display = "none";
      modalTela.style.display = "flex";
      blur.style.zIndex = "2";
  }
})

// document.getElementById("modal-concluir-cadastro-cancelar").addEventListener("click", () => {
//   const modalLista = document.getElementById("modal-lista");
//   const modalCadastro = document.getElementById("modal-cadastro");
//   modalCadastro.style.display = "none";
//   modalLista.style.display = "flex";
// })

document.addEventListener("DOMContentLoaded", mostrarVagas);
window.addEventListener('resize', mostrarVagas);