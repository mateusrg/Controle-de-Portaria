const urlBase = 'http://localhost:3000';

class Morador {
    #idMorador;
    #idApartamento;
    #nome;
    #telefone;
    #email;
    #status;
    #criadoEm;
    #bloco;
    #numeracao;

    constructor({ idMorador, idApartamento, nome, telefone, email, status, criadoEm, bloco, numeracao }) {
        this.#idMorador = idMorador;
        this.#idApartamento = idApartamento;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#email = email;
        this.#status = status;
        this.#criadoEm = criadoEm;
        this.#bloco = bloco;
        this.#numeracao = numeracao;
    }

    get idMorador() {
        return this.#idMorador;
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

    get criadoEm() {
        return this.#criadoEm;
    }

    get bloco() {
        return this.#bloco;
    }

    get numeracao() {
        return this.#numeracao;
    }

    async setIdApartamento(idApartamento) {
        const data = { idApartamento: idApartamento };
        const response = await fetch(`${urlBase}/morador/setIdApartamento/${this.#idMorador}`, {
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


    async setNome(nome) {
        const data = { nome: nome };
        const response = await fetch(`${urlBase}/morador/setNome/${this.#idMorador}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#nome = nome;
        }
        return result;
    }

    async setTelefone(telefone) {
        const data = { telefone: telefone };
        const response = await fetch(`${urlBase}/morador/setTelefone/${this.#idMorador}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#telefone = telefone;
        }
        return result;
    }

    async setEmail(email) {
        const data = { email: email };
        const response = await fetch(`${urlBase}/morador/setEmail/${this.#idMorador}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#email = email;
        }
        return result;
    }

    async setStatus(status) {
        const data = { status: status };
        const response = await fetch(`${urlBase}/morador/setStatus/${this.#idMorador}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#status = status;
        }
        return result;
    }

    async setCriadoEm(criadoEm) {
        const data = { criadoEm: criadoEm };
        const response = await fetch(`${urlBase}/morador/setCriadoEm/${this.#idMorador}`, {
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

    static async selecionarPorId(idMorador) {
        const response = await fetch(`${urlBase}/morador/selecionarPorId/${idMorador}`);
        const result = await response.json();

        if (!result.success || result.data == null) {
            return null;
        }

        const morador = result.data;
        
        return new Morador({
            idMorador: morador['id_morador'],
            idApartamento: morador['id_apartamento'],
            nome: morador['nome'],
            telefone: morador['telefone'],
            email: morador['email'],
            status: morador['status'],
            criadoEm: morador['criado_em'],
            bloco: morador['bloco'],
            numeracao: morador['numeracao']
        });
    }

    static async cadastrar(idApartamento, nome, telefone, email, status, criadoEm) {
        const data = { idApartamento: idApartamento, nome: nome, telefone: telefone, email: email, status: status, criadoEm: criadoEm };
        const response = await fetch(`${urlBase}/morador`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!result.success) {
            return null;
        }

        const morador = this.selecionarPorId(result.data);
        return morador;
    }

    async editar(idApartamento, nome, telefone, email, status, criadoEm) {
        const data = { idApartamento: idApartamento, nome: nome, telefone: telefone, email: email, status: status, criadoEm: criadoEm };
        const response = await fetch(`${urlBase}/morador/${this.#idMorador}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            this.#idApartamento = idApartamento,
            this.#nome = nome,
            this.#telefone = telefone,
            this.#email = email,
            this.#status = status,
            this.#criadoEm = criadoEm
        }
        return result;
    }

    async deletar() {
        const response = await fetch(`${urlBase}/morador/${this.#idMorador}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        if (result.success) {
            this.#idMorador = null,
            this.#idApartamento = null,
            this.#nome = null,
            this.#telefone = null,
            this.#email = null,
            this.#status = null,
            this.#criadoEm = null,
            this.#bloco = null,
            this.#numeracao = null
        }
        return result;
    }

    toString() {
        return this.#idMorador == null ? null : `----------------------------
ID do Morador: ${this.#idMorador}
ID do Apartamento: ${this.#idApartamento}
Nome: ${this.#nome}
Telefone: ${this.#telefone}
E-mail: ${this.#email}
Status: ${this.status}
Data de Criação: ${this.#criadoEm}
Bloco: ${this.#bloco}
Numeração: ${this.#numeracao}
----------------------------
`;
    }
}

export default Morador;