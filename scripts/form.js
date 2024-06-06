var botaoAdicionar = document.querySelector("#adicionar-encomenda");

botaoAdicionar.addEventListener("click", function (event) {

    event.preventDefault();

    // Limpa a lista de erros antes de adicionar novos erros
    var errorList = document.getElementById("error-list");
    errorList.innerHTML = "";

    // Obter os valores dos campos do formulário
    var nome = document.querySelector("#nome").value;
    var quantidadeInput = document.querySelector("#qtde");
    var quantidade = quantidadeInput.value;
    var produto = document.querySelector("#produto").value;
    var valorInput = document.querySelector("#unitario");
    var valor = valorInput.value;

    function adicionarErro(mensagem) {
        var listItem = document.createElement("li");
        listItem.textContent = mensagem;
        listItem.classList.add("mensagens-erro"); // Adiciona a classe de erro
        errorList.appendChild(listItem);
    }

    // Lógica de validação para os campos do formulário
    if (nome === "") {
        adicionarErro("Por favor, preencha o nome.");
    }
    if (quantidade === "") {
        adicionarErro("Por favor, preencha a quantidade.");
    } else if (isNaN(quantidade) || parseInt(quantidade) <= 0) {
        adicionarErro("A quantidade deve ser um número maior que zero.");
    }
    if (produto === "") {
        adicionarErro("Por favor, selecione o produto.");
    }
    if (valor === "") {
        adicionarErro("Por favor, preencha o valor unitário.");
    } else if (isNaN(valor) || parseFloat(valor) <= 0 || !/\./.test(valor)) {
        adicionarErro("O valor unitário deve ser um número maior que zero e conter '.' ou ','");
    }

    // Se houver erros, sai da função
    if (errorList.children.length > 0) {
        return;
    }

    //Captura o formulário da página
    var form = document.querySelector("#form-adiciona");

    //Captura os dados da nova encomenda
    var encomenda = obtemEncomenda(form);

    //Valida se a encomenda pode ser inserida
    if (validaEncomenda(encomenda).length > 0) {
        console.log(validaEncomenda(encomenda));
    } else {
        //Insere a nova encomenda na tabela
        addEncomenda(encomenda);

        //Limpa o formulário
        form.reset();
    }

});

//Função para validar os dados da encomenda antes de adicioná-la à tabela
function validaEncomenda(encomenda) {
    var erros = [];

    //Verifica se o nome foi informado
    if (encomenda.nome === "") {
        erros.push("Nome não pode ser vazio.");
    }

    //Verifica se a quantidade é um número positivo
    if (isNaN(encomenda.qtde) || encomenda.qtde <= 0) {
        erros.push("Quantidade inválida. Deve ser um número positivo.");
    }

    //Verifica se o produto foi selecionado
    if (encomenda.produto === "") {
        erros.push("Selecione um produto.");
    }

    //Verifica se o valor unitário é um número positivo
    if (isNaN(encomenda.unitario) || encomenda.unitario <= 0) {
        erros.push("Valor unitário inválido. Deve ser um número positivo.");
    }

    return erros;
}

//Função para capturar os dados da nova encomenda
function obtemEncomenda(dadosForm) {

    var encomenda = {
        nome: dadosForm.nome.value,
        qtde: dadosForm.qtde.value,
        produto: dadosForm.produto.value,
        unitario: dadosForm.unitario.value,
    }

    return encomenda;
}

//Função para adicionar a nova encomenda na tabela
function addEncomenda(novaEncomenda) {

    var tabela = document.querySelector("#tabela-clientes");

    tabela.appendChild(montaTR(novaEncomenda));
}

//Monta uma coluna nova
function montaTD(dado) {

    var td = document.createElement("td");
    td.textContent = dado;

    return td;
}

//Monta uma nova TR
function montaTR(novaEncomenda) {

    var tr = document.createElement("tr");

    tr.appendChild(montaTD(novaEncomenda.nome));
    tr.appendChild(montaTD(novaEncomenda.produto));
    tr.appendChild(montaTD(novaEncomenda.qtde));
    tr.appendChild(montaTD(formataValor(parseFloat(novaEncomenda.unitario))));
    tr.appendChild(montaTD(calculaTotal(novaEncomenda.qtde, novaEncomenda.unitario)));

    return tr;
}

// Função para formatar o valor em moeda
function formataValor(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para calcular o total
function calculaTotal(qtde, unitario) {
    return formataValor(qtde * unitario);
}

// Adicionando evento de duplo clique para excluir linhas da tabela
var tabela = document.querySelector("#tabela-clientes");

tabela.addEventListener("dblclick", function(event){
    event.target.parentNode.classList.add("fadeOut")

    setTimeout(function (){
        event.target.parentNode.remove();
    }, 500);
})

