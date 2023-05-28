let qtdRetorno = {};
let quantidadesMaximas = {};

function toggleQuantidadesMaximas() {
    const quantidadesMaximasElement = document.getElementById("quantidadesMaximas");
    quantidadesMaximasElement.style.display = document.getElementById("limitarQuantidade").checked ? "block" : "none";

    if (document.getElementById("limitarQuantidade").checked) {
        quantidadesMaximas = {
            20000: document.getElementById("quantidade200").value !== "" ? parseInt(document.getElementById("quantidade200").value) : Infinity,
            10000: document.getElementById("quantidade100").value !== "" ? parseInt(document.getElementById("quantidade100").value) : Infinity,
            5000: document.getElementById("quantidade50").value !== "" ? parseInt(document.getElementById("quantidade50").value) : Infinity,
            2000: document.getElementById("quantidade20").value !== "" ? parseInt(document.getElementById("quantidade20").value) : Infinity,
            1000: document.getElementById("quantidade10").value !== "" ? parseInt(document.getElementById("quantidade10").value) : Infinity,
            500: document.getElementById("quantidade5").value !== "" ? parseInt(document.getElementById("quantidade5").value) : Infinity,
            200: document.getElementById("quantidade2").value !== "" ? parseInt(document.getElementById("quantidade2").value) : Infinity,
            100: document.getElementById("quantidade1").value !== "" ? parseInt(document.getElementById("quantidade1").value) : Infinity,
            50: document.getElementById("quantidade05").value !== "" ? parseInt(document.getElementById("quantidade05").value) : Infinity,
            25: document.getElementById("quantidade025").value !== "" ? parseInt(document.getElementById("quantidade025").value) : Infinity,
            10: document.getElementById("quantidade010").value !== "" ? parseInt(document.getElementById("quantidade010").value) : Infinity,
            5: document.getElementById("quantidade005").value !== "" ? parseInt(document.getElementById("quantidade005").value) : Infinity,
            1: document.getElementById("quantidade001").value !== "" ? parseInt(document.getElementById("quantidade001").value) : Infinity
        };
    } else {
        quantidadesMaximas = {
            20000: Infinity,
            10000: Infinity,
            5000: Infinity,
            2000: Infinity,
            1000: Infinity,
            500: Infinity,
            200: Infinity,
            100: Infinity,
            50: Infinity,
            25: Infinity,
            10: Infinity,
            5: Infinity,
            1: Infinity
        };
    }
}



function encontrarMenorTroco(valorTroco) {
    inicializarqtdRetorno(); // Inicializa o objeto de resposta com 0 cedulas e moedas para cada valor

    const heap = new MaxHeap();
    heap.add(1);
    heap.add(5);
    heap.add(10);
    heap.add(25);
    heap.add(50);
    heap.add(100);
    heap.add(200);
    heap.add(500);
    heap.add(1000);
    heap.add(2000);
    heap.add(5000);
    heap.add(10000);
    heap.add(20000);

    while (valorTroco !== 0) {
        const valor = heap.remove();
        while (valorTroco >= valor && qtdRetorno[valor] < quantidadesMaximas[valor]) {
            valorTroco -= valor;
            qtdRetorno[valor]++;
        }
    }

    console.log(qtdRetorno);
    console.log(quantidadesMaximas);
    console.log(valorTroco);
    heap.printHeap();

    return qtdRetorno; // Retorna o objeto com a quantidade de cedulas e moedas de cada valor
}


function inicializarqtdRetorno() {
    qtdRetorno = {
        20000: 0,
        10000: 0,
        5000: 0,
        2000: 0,
        1000: 0,
        500: 0,
        200: 0,
        100: 0,
        50: 0,
        25: 0,
        10: 0,
        5: 0,
        1: 0
    };
}

function calcularTroco() {
    let trocoQtdValores = {};
    const valorCompra = parseFloat(document.getElementById("valorCompra").value) || 0;
    const valorPago = parseFloat(document.getElementById("valorPago").value) || 0;
    const troco = Math.round((valorPago - valorCompra) * 100);

    if (troco < 0) {
        document.getElementById("resultado").innerHTML = "Pagamento insuficiente.";
        return;
    } else if (troco == 0) {
        document.getElementById("resultado").innerHTML = "Não há troco.";
    }
    else {
        toggleQuantidadesMaximas();
        trocoQtdValores = encontrarMenorTroco(troco);

        let resultado = "<table class='fade-in-table'>";
        resultado += "<tr><th class='espc'>Valor</th><th>Quantidade</th></tr>";

        for (const moedaCedula in trocoQtdValores) {
            const quantidade = trocoQtdValores[moedaCedula];
            if (quantidade > 0) {
                resultado += "<tr class='fade-in-row'><td>" + formatarValor(moedaCedula) + "</td><td class='quantidade'>" + quantidade + "</td></tr>";

            }

        }

        resultado += "</table>";
        resultado += "Troco: " + formatarValor(troco);

        document.getElementById("resultado").innerHTML = resultado;
        return;
    }


}

function formatarValor(valorCentavos) {
    const valorReais = Math.floor(valorCentavos / 100); // Valor em reais (parte inteira)
    const valorCentavosRestantes = valorCentavos % 100; // Centavos restantes

    const centavosFormatados = valorCentavosRestantes.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

    return `R$ ${valorReais},${centavosFormatados}`;
}

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // Helper Methods
    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }

    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }

    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }

    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }

    leftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }

    rightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }

    parent(index) {
        return this.heap[this.getParentIndex(index)];
    }

    swap(indexOne, indexTwo) {
        const temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }

    peek() {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }

    // Removing an element will remove the
    // top element with highest priority then
    // heapifyDown will be called
    remove() {
        if (this.heap.length === 0) {
            return null;
        }
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }

    add(item) {
        this.heap.push(item);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.parent(index) < this.heap[index]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let largerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.rightChild(index) > this.leftChild(index)) {
                largerChildIndex = this.getRightChildIndex(index);
            }
            if (this.heap[index] > this.heap[largerChildIndex]) {
                break;
            } else {
                this.swap(index, largerChildIndex);
            }
            index = largerChildIndex;
        }
    }

    printHeap() {
        let heap = ` ${this.heap[0]} `;
        for (let i = 1; i < this.heap.length; i++) {
            heap += ` ${this.heap[i]} `;
        }
        console.log(heap);
    }
}
