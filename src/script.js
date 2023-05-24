function toggleQuantidadesMaximas() {
    const quantidadesMaximas = document.getElementById("quantidadesMaximas");
    quantidadesMaximas.style.display = document.getElementById("limitarQuantidade").checked ? "block" : "none";
}

function encontrarMenorTroco(valorTroco, quantidadesMaximas) {
    const moedas = [100, 50, 25, 10, 5, 1]; // Denominações das moedas disponíveis
    const quantidadeMoedas = {}; // Objeto para armazenar a quantidade de moedas de cada valor

    function inicializarQuantidadeMoedas() {
        for (let i = 0; i < moedas.length; i++) {
            const moeda = moedas[i];
            quantidadeMoedas[moeda] = 0; // Inicializa a quantidade de cada moeda como 0
        }
    }

    inicializarQuantidadeMoedas(); // Inicializa o objeto de resposta com 0 moedas para cada valor

    for (let i = 0; i < moedas.length; i++) {
        const valorMoeda = moedas[i];
        while (valorTroco >= valorMoeda && (!quantidadesMaximas || quantidadeMoedas[valorMoeda] < quantidadesMaximas[valorMoeda])) {
            quantidadeMoedas[valorMoeda]++;
            valorTroco -= valorMoeda;
        }
    }

    return quantidadeMoedas; // Retorna o objeto com a quantidade de moedas de cada valor
}

function calcularTroco() {
    const valorCompra = parseFloat(document.getElementById("valorCompra").value) || 0;
    const valorPago = parseFloat(document.getElementById("valorPago").value) || 0;
    const troco = Math.round((valorPago - valorCompra) * 100);
    const limitarQuantidade = document.getElementById("limitarQuantidade").checked;

    let quantidadesMaximas = null;
    if (limitarQuantidade) {
        quantidadesMaximas = {
            100: parseInt(document.getElementById("quantidade100").value) || Infinity,
            50: parseInt(document.getElementById("quantidade50").value) || Infinity,
            25: parseInt(document.getElementById("quantidade25").value) || Infinity,
            10: parseInt(document.getElementById("quantidade10").value) || Infinity,
            5: parseInt(document.getElementById("quantidade5").value) || Infinity,
            1: parseInt(document.getElementById("quantidade1").value) || Infinity,
        };
    }

    const trocoQtdValores = encontrarMenorTroco(troco, quantidadesMaximas);

    if (troco < 0) {
        document.getElementById("resultado").innerHTML = "Pagamento insuficiente.";
        return;
    }

    let resultado = "<table>";
    resultado += "<tr><th class='espc'>Valor</th><th>Quantidade</th></tr>";


    for (const moeda in trocoQtdValores) {
        const quantidade = trocoQtdValores[moeda];
        resultado += "<tr><td>" + formatarValor(moeda) + "</td><td>" + quantidade + "</td></tr>";
    }

    resultado += "</table>";
    resultado += "Troco: " + formatarValor(troco);

    document.getElementById("resultado").innerHTML = resultado;
}

function formatarValor(valorCentavos) {
    const valorReais = Math.floor(valorCentavos / 100); // Valor em reais (parte inteira)
    const valorCentavosRestantes = valorCentavos % 100; // Centavos restantes

    const centavosFormatados = valorCentavosRestantes.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

    return `R$ ${valorReais},${centavosFormatados}`;
}



