const botaoBuscar = document.querySelector("#buscar-encomendas");

botaoBuscar.addEventListener("click", function() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/encomendas_web");
    xhr.addEventListener("load", function() {
        if (xhr.status === 200) { // Verifica se a requisição foi bem-sucedida
            const resposta = xhr.responseText;
            const encomendas = JSON.parse(resposta);

            // Insere as encomendas na tabela
            encomendas.forEach(function(encomenda) {
                encomenda.total = calculaTotal(encomenda.qtde, encomenda.unitario);
                addEncomenda(encomenda);
            });
        } else {
            console.error("Erro ao buscar encomendas: " + xhr.statusText);
        }
    });

    xhr.addEventListener("error", function() {
        console.error("Erro de rede ao tentar buscar as encomendas.");
    });

    xhr.send();
});

// Função para adicionar a nova encomenda na tabela
function addEncomenda(novaEncomenda) {
    const tabela = document.querySelector("#tabela-clientes");

    tabela.appendChild(montaTR(novaEncomenda));
}

// Função para montar uma nova TR
function montaTR(novaEncomenda) {
    const tr = document.createElement("tr");
    tr.classList.add("cliente"); // Adiciona a classe "cliente"

    tr.appendChild(montaTD(novaEncomenda.nome, "info-nome"));
    tr.appendChild(montaTD(novaEncomenda.produto, "info-produto"));
    tr.appendChild(montaTD(novaEncomenda.qtde, "info-qtde"));
    tr.appendChild(montaTD(formataValor(parseFloat(novaEncomenda.unitario)), "info-valor"));
    tr.appendChild(montaTD(formataValor(parseFloat(novaEncomenda.total)), "info-total"));

    return tr;
}

// Função para montar uma nova TD
function montaTD(dado, classe) {
    const td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

// Função para formatar o valor em moeda
function formataValor(valor) {
    return valor.toLocaleString('en', { style: 'currency', currency: 'USD' });
}

// Função para calcular o total
function calculaTotal(qtde, unitario) {
    return qtde * unitario;
}
