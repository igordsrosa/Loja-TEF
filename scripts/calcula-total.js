// Define o título da tabela como "Lista de Encomendas"
var titulo = document.querySelector(".titulo");
titulo.textContent = "Lista de Encomendas";

// Captura os dados de todos os clientes
var clientes = document.querySelectorAll(".cliente");

// Loop através de todos os clientes
for (var i = 0; i < clientes.length; i++) {

    // Obtém a quantidade e o valor unitário do cliente atual
    var qtde = clientes[i].querySelector(".info-qtde").textContent;
    var unitario = clientes[i].querySelector(".info-valor").textContent;

    // Valida a quantidade e o valor unitário
    if (!validaQtde(qtde)) {
        // Se a quantidade for inválida, define-a como vazia e exibe uma mensagem de erro
        clientes[i].querySelector(".info-qtde").textContent = "";
        clientes[i].querySelector(".info-qtde").textContent = "Quantidade Inválida!";
        clientes[i].style.color = "red"; // Muda a cor do texto para vermelho
        clientes[i].querySelector(".info-total").textContent = ""; // Define o total como vazio
    } else {
        if (!validaUnitario(unitario)) {
            // Se o valor unitário for inválido, define-o como vazio e exibe uma mensagem de erro
            clientes[i].querySelector(".info-valor").textContent = "";
            clientes[i].querySelector(".info-valor").textContent = "Valor Inválido!";
            clientes[i].style.backgroundColor = "lightcoral"; // Muda a cor de fundo para coral claro
            clientes[i].style.color = "white"; // Muda a cor do texto para branco
            clientes[i].querySelector(".info-total").textContent = ""; // Define o total como vazio
        } else {
            // Se a quantidade e o valor unitário forem válidos, formata o valor e calcula o total
            clientes[i].querySelector(".info-valor").textContent = formataValor(unitario);
            clientes[i].querySelector(".info-total").textContent = calculaTotal(qtde, unitario);
        }
    }
}

// Função para formatar o valor em moeda
function formataValor(valor) {
    var valor = parseFloat(valor);
    return valor.toLocaleString('en', { style: 'currency', currency: 'USD' });
}

// Função para calcular o total
function calculaTotal(qtde, unitario) {
    var total = 0;
    total = qtde * unitario;
    return formataValor(total);
}

// Função para validar a quantidade
function validaQtde(qtde) {
    if ((!isNaN(qtde)) && (qtde > 0)) {
        return true;
    } else {
        return false;
    }
}

// Função para validar o valor unitário
function validaUnitario(unitario) {
    if ((!isNaN(unitario)) && (unitario > 0)) {
        return true;
    } else {
        return false;
    }
}
