function mostrarSection(bloco) {
    const section = document.getElementById("main-section");
    const titulo = document.getElementById("titulo-apartamento");
    section.style.display = "none";
    section.style.display = "block";
    titulo.textContent = `Apartamentos Bloco ${bloco}`;
}