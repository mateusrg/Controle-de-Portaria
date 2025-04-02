function mostrarSection(bloco) {
    const section = document.getElementById("main-section");
    const titulo = document.getElementById("titulo-apartamento");
    section.style.display = "none";
    section.style.display = "block";
    titulo.textContent = `Apartamentos Bloco ${bloco}`;
}

function mostrarModal(apto) {
    const modal = document.getElementById("modal");
    const titulo2 = document.getElementById("titulo-moradores");
    modal.style.display = "none";
    modal.style.display = "block";
    titulo2.textContent = `Moradores ${apto}`;
}

closeModal.onclick = function() {
    modal.style.display = "none";
}
