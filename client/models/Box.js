const urlBase = 'http://localhost:3000';

class Box {
    #idBox;
    #idApartamento;

    constructor({ idBox, idApartamento }) {
        this.#idBox = idBox;
        this.#idApartamento = idApartamento;
    }

    get idApartamento() {
        return this.#idApartamento;
    }

    get idBox() {
        return this.#idBox;
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

    static async criar(idApartamento) {
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
        
        return new Box({
            idBox: result.data,
            idApartamento: idApartamento
        });
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
        }
        return result;
      }
    
      toString() {
        // Puxar das funções e fazer um "selecionarPorId". tbm fzr um "exibirTudo" em tds as tabelas
      }
}

export default Box;