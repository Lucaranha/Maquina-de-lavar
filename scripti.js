document.addEventListener("DOMContentLoaded", function () {
    let selecionados = [];

    document.querySelectorAll("td").forEach(cell => {
        cell.addEventListener("click", function () {
            if (!this.textContent) {
                if (selecionados.includes(this)) {
                    // Se já estiver selecionado, desseleciona
                    this.style.backgroundColor = "";
                    selecionados = selecionados.filter(item => item !== this);
                } else {
                    // Seleciona horário
                    this.style.backgroundColor = "#d0e0ff"; // Destaque visual
                    selecionados.push(this);
                }
            } else {
                let confirmar = confirm("Deseja cancelar esta reserva?");
                if (confirmar) {
                    this.style.backgroundColor = "#ffff";
                    this.textContent = "";
                    this.classList.remove("reservado");
                    selecionados = [];
                }
            }
        });
    });

});
document.addEventListener("DOMContentLoaded", function () {
    let selecionados = [];
    let modal = document.getElementById("nomeModal");
    let nomeInput = document.getElementById("nomeInput");
    let salvarNomeBtn = document.getElementById("salvarNome");
    let closeModal = document.querySelector(".close");
    let currentCells = [];

    document.querySelectorAll("td").forEach(cell => {
        cell.addEventListener("click", function () {
            if (!this.textContent) {
                if (selecionados.includes(this)) {
                    this.style.backgroundColor = "";
                    selecionados = selecionados.filter(item => item !== this);
                } else {
                    this.style.backgroundColor = "#d0e0ff";
                    selecionados.push(this);
                }
            } else {
                let confirmar = confirm("Deseja cancelar esta reserva?");
                if (confirmar) {
                    this.textContent = "";
                    this.classList.remove("reservado");
                }
            }
        });
    });

    document.getElementById("confirmarBtn").addEventListener("click", function () {
        if (selecionados.length === 0) {
            alert("Nenhum horário selecionado.");
            return;
        }

        // Abre o modal para inserir o nome
        modal.style.display = "flex";
        nomeInput.value = "";
        currentCells = [...selecionados];
    });

    // Quando clicar em "Confirmar" no modal
    salvarNomeBtn.addEventListener("click", function () {
        let nome = nomeInput.value.trim();
        if (nome) {
            currentCells.forEach(cell => {
                cell.textContent = nome;
                cell.classList.add("reservado");
                cell.style.backgroundColor = "#a0e0a0";
            });
        }   
        selecionados = [];
        modal.style.display = "none";
    });

    // Fecha o modal ao clicar no "X"
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Fecha o modal se clicar fora dele
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
