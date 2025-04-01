import Apartamento from '../models/Apartamento.js';
import Box from '../models/Box.js';
import Morador from '../models/Morador.js';
import * as apto from './funcoes/apartamento.js';
import * as box from './funcoes/box.js';
import * as morador from './funcoes/morador.js';

async function main() {
    const apartamento = await Apartamento.criar('A', '123');
    await apartamento.editar('B', '456');
    await apartamento.setBloco('C');
    await apartamento.setNumeracao('701');
    await apartamento.deletar();

    console.log(await apto.listarTodos());
    console.log(await apto.listarPorBloco('A'));
    console.log(await apto.listarPorNumeracao('123'));
    console.log(await apto.selecionarPorId(4));
    console.log(apartamento.toString());
}
main();