import Apartamento from '../models/Apartamento.js';
import Box from '../models/Box.js';
import Morador from '../models/Morador.js';
import Veiculo from '../models/Veiculo.js';

import Apartamentos from './funcoes/apartamento.js';
import Boxes from './funcoes/box.js';
import Moradores from './funcoes/morador.js';
import Veiculos from './funcoes/veiculo.js';


// Selecionar um apartamento por ID
const apartamentoBala = Apartamentos.selecionarPorId(10)
// Cadastrar um novo apartamento (a instância ainda não existe, mas NÃO usar *new*)
const apartamento = Apartamentos.cadastrar('A', '123');

// Editar um apartamento (o ap já precisa existir e estar armazenado uma variávle, seja tendo sido cadastrado, puxado por ID, parte de uma lista etc.)
apartamento.editar('B', '456');

// Editar só um atributo específico (menos ID)
apartamento.setBloco('L');

// Para imprimir um apartamento no console p testes:

// Forma 1 (estar dentro de uma concatenação, em qlq posição q seja):
console.log(`${apartamento}`);

// Forma 2
console.log(apartamento.toString());


// Puxar lista com todos os apartamentos
const apartamentos = await Apartamentos.listarTodos();

// Exemplo de como imprimir na tela oq tá na lista (só um foreach normal)
apartamentos.forEach(apartamento => console.log(`${apartamento}`));

// Pra puxar um atributo
console.log(apartamento.idApartamento);
console.log(apartamento.bloco);
console.log(apartamento.numeracao);
