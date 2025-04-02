// Condomínio

function mostrarSection(bloco) {
    const apartamentos = document.getElementById("div-apartamento");
    const titulo = document.getElementById("titulo-apartamento");
    const secaoApartamento = document.getElementById("secao-apartamento");
    const secaoMaior = document.getElementById("secao-lista-maior");
    const secaoMenor = document.getElementById("secao-lista-menor");
    if (bloco == "A" || bloco == "F") {
        secaoMaior.style.display = "grid";
        secaoMenor.style.display = "none";
        secaoApartamento.style.width = "25vw";
    } else {
        secaoMaior.style.display = "none";
        secaoMenor.style.display = "grid";
        secaoApartamento.style.width = "20vw";
    }
    apartamentos.style.display = "none";
    apartamentos.style.display = "flex";
    titulo.textContent = `Apartamentos Bloco ${bloco}`;
}

function mostrarModal(apto) {
    const modal = document.getElementById("modal");
    const titulo = document.getElementById("titulo-moradores");
    modal.style.display = "none";
    modal.style.display = "block";
    titulo.textContent = `Moradores ${apto}`;
}

document.getElementById("closeModal").addEventListener("click", () => {
    modal.style.display = "none";
})

// Vagas

