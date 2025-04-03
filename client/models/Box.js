const urlBase = 'http://localhost:3000';

class Box {
    #idBox;
    #idApartamento;
    #bloco;
    #numeracao;
    #idVeiculo;
    #idMorador;
    #placa;
    #modelo;
    #cor;
    #criadoEm;

    constructor({ idBox, idApartamento, bloco, numeracao, idVeiculo, idMorador, placa, modelo, cor, criadoEm }) {
        this.#idBox = idBox;
        this.#idApartamento = idApartamento;
        this.#bloco = bloco;
        this.#numeracao = numeracao;
        this.#idVeiculo = idVeiculo;
        this.#idMorador = idMorador;
        this.#placa = placa;
        this.#modelo = modelo;
        this.#cor = cor;
        this.#criadoEm = criadoEm;
    }
    
    get idBox() {
        return this.#idBox;
    }

    get idApartamento() {
        return this.#idApartamento;
    }

    get bloco() {
        return this.#bloco;
    }

    get numeracao() {
        return this.#numeracao;
    }

    get idVeiculo() {
        return this.#idVeiculo;
    }

    get idMorador() {
        return this.#idMorador;
    }

    get placa() {
        return this.#placa;
    }

    get modelo() {
        return this.#modelo;
    }

    get cor() {
        return this.#cor;
    }

    get criadoEm() {
        return this.#criadoEm;
    }

    async setApartamento(idApartamento) {
        const data = { idApartamento: idApartamento };
        const response = await fetch(`${urlBase}/box/${this.#idBox}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#idApartamento = idApartamento;
        }
        return result;
    }

    static async selecionarPorId(idBox) {
        const response = await fetch(`${urlBase}/box/selecionarPorId/${idBox}`);
        const result = await response.json();
        
        if (!result.success || result.data == null) {
            return null;
        }

        const box = result.data;
        
        return new Box({
            idBox: box['id_box'],
            idApartamento: box['id_apartamento'],
            bloco: box['bloco'],
            numeracao: box['numeracao'],
            idVeiculo: box['id_veiculo'],
            idMorador: box['id_morador'],
            placa: box['placa'],
            modelo: box['modelo'],
            cor: box['cor'],
            criadoEm: box['criado_em']
        });
    }

    static async cadastrar(idApartamento) {
        const data = { idApartamento: idApartamento };
        const response = await fetch(`${urlBase}/box`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!result.success) {
            return null;
        }

        const box = await this.selecionarPorId(result.data);
        return box;
    }

    async editar(idApartamento) {
        const data = { idApartamento: idApartamento };
        const response = await fetch(`${urlBase}/box/${this.#idBox}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#idApartamento = idApartamento;
        }
        return result;
    }

    async deletar() {
        const response = await fetch(`${urlBase}/box/${this.#idBox}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
    
        const result = await response.json();
        if (result.success) {
            this.#idBox = null;
            this.#idApartamento = null;
            this.#bloco = null
            this.numeracao = null,
            this.idVeiculo = null,
            this.idMorador = null,
            this.placa = null,
            this.modelo = null,
            this.cor = null,
            this.criadoEm = null
        }
        return result;
      }
    
      toString() {
        return this.#idBox == null ? null : `----------------------------
ID do Box: ${this.#idBox}
ID do Apartamento: ${this.#idApartamento}
Bloco: ${this.#bloco}
Numeração: ${this.#numeracao}
ID do Veículo: ${this.#idVeiculo}
ID do Morador: ${this.#idMorador}
Placa: ${this.#placa}
Modelo: ${this.#modelo}
Cor: ${this.#cor}
Data de Criação: ${this.#criadoEm}
----------------------------
`;
      }
}

export default Box;