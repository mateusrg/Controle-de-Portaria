const urlBase = 'http://localhost:3000';

class Apartamento {
  #idApartamento;
  #bloco;
  #numeracao;

  constructor({ idApartamento, bloco, numeracao }) {
    this.#idApartamento = idApartamento;
    this.#bloco = bloco;
    this.#numeracao = numeracao;
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

  async setBloco(bloco) {
    const data = { bloco: bloco };
    const response = await fetch(`${urlBase}/apartamento/setBloco/${this.#idApartamento}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      this.#bloco = bloco;
    }
    return result;
  }

  async setNumeracao(numeracao) {
    const data = { numeracao: numeracao };
    const response = await fetch(`${urlBase}/apartamento/setNumeracao/${this.#idApartamento}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      this.#numeracao = numeracao;
    }
    return result;
  }

  static async selecionarPorId(idApartamento) {
    const response = await fetch(`${urlBase}/apartamento/selecionarPorId/${idApartamento}`);
    const result = await response.json();
    
    if (!result.success || result.data == null) {
        return null;
    }

    const apartamento = result.data;
    console.log(result);
    
    return new Apartamento({
      idApartamento: apartamento['id_apartamento'],
      bloco: apartamento['bloco'],
      numeracao: apartamento['numeracao']
    });
}

  static async cadastrar(bloco, numeracao) {
    const data = { bloco: bloco, numeracao: numeracao };
    const response = await fetch(`${urlBase}/apartamento`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      return null;
    }
    
    return new Apartamento({
      idApartamento: result.data,
      bloco: bloco,
      numeracao: numeracao
    });
  }

  async editar(bloco, numeracao) {
    const data = { bloco: bloco, numeracao: numeracao };
    const response = await fetch(`${urlBase}/apartamento/${this.#idApartamento}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      this.#bloco = bloco;
      this.#numeracao = numeracao;
    }
    return result;
  }

  async deletar() {
    const response = await fetch(`${urlBase}/apartamento/${this.#idApartamento}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    if (result.success) {
      this.#idApartamento = null;
      this.#bloco = null;
      this.#numeracao = null;
    }
    return result;
  }

  toString() {
    return `----------------------------
ID do Apartamento: ${this.#idApartamento}
Bloco: ${this.#bloco}
Numeração: ${this.#numeracao}
----------------------------
`;

  }
}

export default Apartamento;
