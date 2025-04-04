import Apartamento from '../models/Apartamento.js';
import Box from '../models/Box.js';
import Morador from '../models/Morador.js';
import Veiculo from '../models/Veiculo.js';

import Apartamentos from './funcoes/apartamento.js';
import Boxes from './funcoes/box.js';
import Moradores from './funcoes/morador.js';
import Veiculos from './funcoes/veiculo.js';

// Vagas

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

    boxes.forEach((box) => {
      const divBox = document.createElement("div");
      divBox.classList.add("vaga");
      divBox.innerHTML = `
      <p class="texto-vaga-desocupada">${box.bloco}${box.numeracao}</p>
      `;

      switch (box.bloco) {
        case "A":
          listaVagasA.appendChild(divBox);
          break;
        case "B":
          listaVagasB.appendChild(divBox);
          break;
        case "C":
          listaVagasC.appendChild(divBox);
          break;
        case "D":
          listaVagasD.appendChild(divBox);
          break;
        case "E":
          listaVagasE.appendChild(divBox);
          break;
        case "F":
          listaVagasF.appendChild(divBox);
          break;
      }
    });
}

document.addEventListener("DOMContentLoaded", mostrarVagas);