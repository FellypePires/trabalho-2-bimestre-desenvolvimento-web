function mostrarResultado(formulario, mensagem) {
    const resultado = formulario.parentElement.querySelector(".resultado");
    resultado.textContent = mensagem;
    resultado.hidden = false;
}

function ler(formulario, nome) {
    return Number(new FormData(formulario).get(nome));
}

const moeda = valor => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const decimal = valor => valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const form1 = document.getElementById("form1");
form1.addEventListener("submit", evento => {
    evento.preventDefault();
    const x = ler(form1, "x");
    const y = ler(form1, "y");
    const z = ler(form1, "z");
    let mensagem;
    if (x + y <= z || x + z <= y || y + z <= x) mensagem = "Os valores informados não formam um triângulo.";
    else if (x === y && y === z) mensagem = "Os lados formam um triângulo equilátero.";
    else if (x === y || x === z || y === z) mensagem = "Os lados formam um triângulo isósceles.";
    else mensagem = "Os lados formam um triângulo escaleno.";
    mostrarResultado(form1, mensagem);
});

const form2 = document.getElementById("form2");
form2.addEventListener("submit", evento => {
    evento.preventDefault();
    const imc = ler(form2, "peso") / (ler(form2, "altura") ** 2);
    let classificacao;
    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc < 25) classificacao = "Peso normal";
    else if (imc < 30) classificacao = "Sobrepeso";
    else if (imc < 35) classificacao = "Obesidade grau 1";
    else if (imc < 40) classificacao = "Obesidade grau 2";
    else classificacao = "Obesidade grau 3";
    mostrarResultado(form2, `IMC: ${decimal(imc)} · Classificação: ${classificacao}.`);
});

const form3 = document.getElementById("form3");
form3.addEventListener("submit", evento => {
    evento.preventDefault();
    const ano = ler(form3, "ano");
    const valor = ler(form3, "valor");
    const taxa = ano < 1990 ? 0.01 : 0.015;
    mostrarResultado(form3, `Taxa de ${(taxa * 100).toLocaleString("pt-BR")}% · Imposto a pagar: ${moeda(valor * taxa)}.`);
});

const form4 = document.getElementById("form4");
form4.addEventListener("submit", evento => {
    evento.preventDefault();
    const salario = ler(form4, "salario");
    const cargo = ler(form4, "cargo");
    const aumentos = { 101: 0.10, 102: 0.20, 103: 0.30 };
    const percentual = aumentos[cargo] ?? 0.40;
    const diferenca = salario * percentual;
    mostrarResultado(form4, `Salário antigo: ${moeda(salario)} · Aumento: ${moeda(diferenca)} · Novo salário: ${moeda(salario + diferenca)}.`);
});

const form5 = document.getElementById("form5");
form5.addEventListener("submit", evento => {
    evento.preventDefault();
    const saldo = ler(form5, "saldo");
    const percentual = saldo <= 200 ? 0 : saldo <= 400 ? 0.20 : saldo <= 600 ? 0.30 : 0.40;
    const credito = percentual ? `Crédito de ${moeda(saldo * percentual)} (${(percentual * 100).toLocaleString("pt-BR")}%).` : "Sem crédito para esta faixa de saldo.";
    mostrarResultado(form5, `Saldo médio: ${moeda(saldo)} · ${credito}`);
});

const form6 = document.getElementById("form6");
form6.addEventListener("submit", evento => {
    evento.preventDefault();
    const codigo = ler(form6, "codigo");
    const quantidade = ler(form6, "quantidade");
    const cardapio = { 1: ["Cachorro quente", 11], 2: ["Bauru", 8.5], 3: ["Misto quente", 8], 4: ["Hambúrguer", 9], 5: ["Cheeseburger", 10], 6: ["Refrigerante", 4.5] };
    const item = cardapio[codigo];
    if (!item) {
        mostrarResultado(form6, "Código inválido. Escolha um item de 1 a 6.");
        return;
    }
    mostrarResultado(form6, `${quantidade} × ${item[0]} · Total: ${moeda(item[1] * quantidade)}.`);
});

const form7 = document.getElementById("form7");
form7.addEventListener("submit", evento => {
    evento.preventDefault();
    const preco = ler(form7, "preco");
    const condicao = new FormData(form7).get("condicao");
    const regras = { a: [0.90, "10% de desconto à vista em dinheiro ou cheque"], b: [0.85, "15% de desconto à vista no cartão"], c: [1, "duas vezes sem juros"], d: [1.10, "duas vezes com 10% de juros"] };
    const total = preco * regras[condicao][0];
    const parcelas = condicao === "c" || condicao === "d" ? ` · 2 parcelas de ${moeda(total / 2)}` : "";
    mostrarResultado(form7, `${regras[condicao][1]} · Total: ${moeda(total)}${parcelas}.`);
});

const form8 = document.getElementById("form8");
form8.addEventListener("submit", evento => {
    evento.preventDefault();
    const nivel = ler(form8, "nivel");
    const horas = ler(form8, "horas");
    const valores = { 1: 12, 2: 17, 3: 25 };
    mostrarResultado(form8, `Nível ${nivel} · Salário mensal: ${moeda(valores[nivel] * horas * 4.5)}.`);
});
