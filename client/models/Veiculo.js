const urlBase = 'http://localhost:3000';

class Veiculo {
    #idVeiculo;
    #idMorador;
    #idBox;
    #placa;
    #modelo;
    #cor;
    #criadoEm;

    constructor({ idVeiculo, idMorador, idBox, placa, modelo, cor, criadoEm }) {
        this.#idVeiculo = idVeiculo;
        this.#idMorador = idMorador;
        this.#idBox = idBox;
        this.#placa = placa;
        this.#modelo = modelo;
        this.#cor = cor;
        this.#criadoEm = criadoEm;
    }

    get idVeiculo() {
        return this.#idVeiculo;
    }

    get idMorador() {
        return this.#idMorador;
    }

    get idBox() {
        return this.#idBox;
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

    async setIdMorador(idMorador) {
        const data = { idMorador: idMorador };
        const response = await fetch(`${urlBase}/veiculo/setIdMorador/${this.#idVeiculo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#idMorador = idMorador;
        }
        return result;
    }

    async setIdBox(idBox) {
        const data = { idBox: idBox };
        const response = await fetch(`${urlBase}/veiculo/setIdBox/${this.#idVeiculo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#idBox = idBox;
        }
        return result;
    }

    async setPlaca(placa) {
        const data = { placa: placa };
        const response = await fetch(`${urlBase}/veiculo/setPlaca/${this.#idVeiculo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#placa = placa;
        }
        return result;
    }

    async setModelo(modelo) {
        const data = { modelo: modelo };
        const response = await fetch(`${urlBase}/veiculo/setModelo/${this.#idVeiculo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#modelo = modelo;
        }
        return result;
    }

    async setCor(cor) {
        const data = { cor: cor };
        const response = await fetch(`${urlBase}/veiculo/setCor/${this.#idVeiculo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#cor = cor;
        }
        return result;
    }

    async setCriadoEm(criadoEm) {
        const data = { criadoEm: criadoEm };
        const response = await fetch(`${urlBase}/veiculo/setCriadoEm/${this.#idVeiculo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#criadoEm = criadoEm;
        }
        return result;
    }

    static async criar(idMorador, idBox, placa, modelo, cor, criadoEm) {
        const data = { idMorador: idMorador, idBox: idBox, placa: placa, modelo: modelo, cor: cor, criadoEm: criadoEm };
        const response = await fetch(`${urlBase}/veiculo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!result.success) {
            return null;
        }

        return new Veiculo({
            idVeiculo: result.data,
            idMorador: idMorador,
            idBox: idBox,
            placa: placa,
            modelo: modelo,
            cor: cor,
            criadoEm: criadoEm
        });
    }

    async editar(idMorador, idBox, placa, modelo, cor, criadoEm) {
        const data = { idApartamento: idApartamento, nome: nome, telefone: telefone, email: email, status: status, criadoEm: criadoEm };
        const response = await fetch(`${urlBase}/morador/${this.#idVeiculo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#idMorador = idMorador,
            this.#idBox = idBox,
            this.#placa = placa,
            this.#modelo = modelo,
            this.#cor = cor,
            this.#criadoEm = criadoEm
        }
        return result;
    }

    async deletar() {
        const response = await fetch(`${urlBase}/morador/${this.#idVeiculo}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        if (result.success) {
            this.#idVeiculo = null,
            this.#idMorador = null,
            this.#idBox = null,
            this.#placa = null,
            this.#modelo = null,
            this.#cor = null,
            this.#criadoEm = null
        }
        return result;
    }
}