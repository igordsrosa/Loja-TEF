const campoFiltro = document.querySelector('#filtrar-tabela');

campoFiltro.addEventListener("input", function () {
    const clientes = document.querySelectorAll(".cliente");
    const termoBusca = this.value.trim();

    if (termoBusca.length > 0) {
        const expressao = new RegExp(termoBusca, "i");

        // Filtra os clientes com base no termo de busca
        clientes.forEach(cliente => {
            const nome = cliente.querySelector(".info-nome").textContent;

            if (!expressao.test(nome)) {
                cliente.classList.add("invisivel");
            } else {
                cliente.classList.remove("invisivel");
            }
        });
    } else {
        // Se não há termo de busca, exibe todos os clientes
        clientes.forEach(cliente => {
            cliente.classList.remove("invisivel");
        });
    }
});
