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

    vagasVisiveis.forEach(box => {
      const divBox = document.createElement("div");
      divBox.classList.add("vaga");

      const texto = document.createElement("p");
      texto.className = "texto-vaga-desocupada";
      texto.textContent = `${box.bloco}${box.numeracao}`;
      divBox.appendChild(texto);

      secao.appendChild(divBox);
    });

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
        console.log(inicioVagas[bloco])
        inicioVagas[bloco]++;
        console.log(inicioVagas[bloco])
        mostrarVagas();
      }
    };
  }
}

document.addEventListener("DOMContentLoaded", mostrarVagas);
window.addEventListener('resize', mostrarVagas);