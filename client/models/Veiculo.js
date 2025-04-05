const urlBase = 'http://localhost:3000';

class Veiculo {
    #idVeiculo;
    #idMorador;
    #idBox;
    #placa;
    #modelo;
    #cor;
    #criadoEm;
    #idApartamento;
    #nome;
    #telefone;
    #email;
    #status;
    #moradorCriadoEm;
    #bloco;
    #numeracao;

    constructor({ idVeiculo, idMorador, idBox, placa, modelo, cor, criadoEm, idApartamento, nome, telefone, email, status, moradorCriadoEm, bloco, numeracao }) {
        this.#idVeiculo = idVeiculo;
        this.#idMorador = idMorador;
        this.#idBox = idBox;
        this.#placa = placa;
        this.#modelo = modelo;
        this.#cor = cor;
        this.#criadoEm = criadoEm;
        this.#idApartamento = idApartamento;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#email = email;
        this.#status = status;
        this.#moradorCriadoEm = moradorCriadoEm;
        this.#bloco = bloco;
        this.#numeracao = numeracao;
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

    get idApartamento() {
        return this.#idApartamento;
    }

    get nome() {
        return this.#nome;
    }

    get telefone() {
        return this.#telefone;
    }

    get email() {
        return this.#email;
    }

    get status() {
        return this.#status;
    }

    get moradorCriadoEm() {
        return this.#moradorCriadoEm;
    }

    get bloco() {
        return this.#bloco;
    }

    get numeracao() {
        return this.#numeracao;
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

    static async selecionarPorId(idVeiculo) {
        const response = await fetch(`${urlBase}/veiculo/selecionarPorId/${idVeiculo}`);
        const result = await response.json();
        
        if (!result.success || result.data == null) {
            return null;
        }

        const veiculo = result.data;

        return new Veiculo({
            idVeiculo: veiculo['id_veiculo'],
            idMorador: veiculo['id_morador'],
            idBox: veiculo['id_box'],
            placa: veiculo['placa'],
            modelo: veiculo['modelo'],
            cor: veiculo['cor'],
            criadoEm: veiculo['criado_em'],
            idApartamento: veiculo['id_apartamento'],
            nome: veiculo['nome'],
            telefone: veiculo['telefone'],
            email: veiculo['email'],
            status: veiculo['status'],
            moradorCriadoEm: veiculo['morador_criado_em'],
            bloco: veiculo['bloco'],
            numeracao: veiculo['numeracao']
        });
    }

    static async selecionarPorBox(IdBox) {
        const response = await fetch(`${urlBase}/veiculo/selecionarPorBox/${IdBox}`);
        const result = await response.json();
        
        if (!result.success || result.data == null) {
            return null;
        }

        const veiculo = result.data;

        return new Veiculo({
            idVeiculo: veiculo['id_veiculo'],
            idMorador: veiculo['id_morador'],
            idBox: veiculo['id_box'],
            placa: veiculo['placa'],
            modelo: veiculo['modelo'],
            cor: veiculo['cor'],
            criadoEm: veiculo['criado_em'],
            idApartamento: veiculo['id_apartamento'],
            nome: veiculo['nome'],
            telefone: veiculo['telefone'],
            email: veiculo['email'],
            status: veiculo['status'],
            moradorCriadoEm: veiculo['morador_criado_em'],
            bloco: veiculo['bloco'],
            numeracao: veiculo['numeracao']
        });
    }

    static async selecionarPorPlaca(placa) {
        const response = await fetch(`${urlBase}/veiculo/selecionarPorPlaca/${placa}`);
        const result = await response.json();
        
        if (!result.success) {
            return null;
        }

        const veiculo = result.data;
        return new Veiculo({
            idVeiculo: veiculo['id_veiculo'],
            idMorador: veiculo['id_morador'],
            idBox: veiculo['id_box'],
            placa: veiculo['placa'],
            modelo: veiculo['modelo'],
            cor: veiculo['cor'],
            criadoEm: veiculo['criado_em'],
            idApartamento: veiculo['id_apartamento'],
            nome: veiculo['nome'],
            telefone: veiculo['telefone'],
            email: veiculo['email'],
            status: veiculo['status'],
            moradorCriadoEm: veiculo['morador_criado_em'],
            bloco: veiculo['bloco'],
            numeracao: veiculo['numeracao']
        });
    }

    static async cadastrar(idMorador, idBox, placa, modelo, cor, criadoEm) {
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

        const veiculo = this.selecionarPorId(result.data);

        return veiculo;
    }

    async editar(idMorador, idBox, placa, modelo, cor, criadoEm) {
        const data = { idMorador: idMorador, idBox: idBox, placa: placa, modelo: modelo, cor: cor, criadoEm: criadoEm };
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
            this.#criadoEm = null,
            this.#idApartamento = null,
            this.#nome = null,
            this.#telefone = null,
            this.#email = null,
            this.#status = null,
            this.#moradorCriadoEm = null,
            this.#bloco = null,
            this.#numeracao = null
        }
        return result;
    }

    toString() {
        return this.#idVeiculo == null ? null : `----------------------------
ID do Veículo: ${this.#idVeiculo}
ID do Morador: ${this.#idMorador}
ID do Box: ${this.#idBox}
Placa: ${this.#placa}
Modelo: ${this.#modelo}
Cor: ${this.#cor}
Data de Criação: ${this.#criadoEm}
----------------------------
`;
    }
}

export default Veiculo;