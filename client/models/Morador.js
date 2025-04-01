const urlBase = 'http://localhost:3000';

class Morador {
    #idMorador;
    #idApartamento;
    #nome;
    #telefone;
    #email;
    #status;
    #criadoEm;

    constructor({ idMorador, idApartamento, nome, telefone, email, status, criadoEm }) {
        this.#idMorador = idMorador;
        this.#idApartamento = idApartamento;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#email = email;
        this.#status = status;
        this.#criadoEm = criadoEm;
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

    static async criar(idApartamento, nome, telefone, email, status, criadoEm) {
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

        return new Morador({
            idMorador: result.data,
            idApartamento: idApartamento,
            nome: nome,
            telefone: telefone,
            email: email,
            status: status,
            criadoEm: criadoEm
        });
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
            this.#criadoEm = null
        }
        return result;
    }
}