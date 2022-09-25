let json;

fetch("json/finance.json")
    .then(e => e.text())
    .then((jsonp) => {
        json = JSON.parse(jsonp);
    });

const tbody = document.querySelector("#tbody");
const type = document.querySelector("#type");

type.addEventListener("change", function(e){

    tbody.innerHTML = "";
    calculaEntradaSaidaSaldo();
    realizaPesquisa(type.value);

});

function realizaPesquisa(type){

    for(let operacoes of json){
        if(operacoes.type.toLowerCase() == type){

            const tdData = document.createElement("td");
            const tdCliente = document.createElement("td");
            const tdTelefone = document.createElement("td");
            const tdLoja = document.createElement("td");
            const tdTelefoneLoja = document.createElement("td");
            const tdTipo = document.createElement("td");
            const tdQuantidade = document.createElement("td");
            const tdPrecoUnitario = document.createElement("td");
            const tdPrecoTotal = document.createElement("td");

            tdData.innerText = formataData(operacoes.date);
            tdCliente.innerText = `${operacoes.customer.first_name} ${operacoes.customer.last_name}`; 
            tdTelefone.innerText = operacoes.customer.phone;
            tdLoja.innerText = operacoes.store.name;
            tdTelefoneLoja.innerText = operacoes.store.phone;
            tdTipo.innerText = operacoes.type == "IN" ? "Entrada" : "Saída";
            tdQuantidade.innerText = operacoes.amount;
            tdPrecoUnitario.innerText = formataPreco(operacoes.price / operacoes.amount);
            tdPrecoTotal.innerText = formataPreco(operacoes.price);

            const tr = document.createElement("tr");

            tr.appendChild(tdData);
            tr.appendChild(tdCliente);
            tr.appendChild(tdTelefone);
            tr.appendChild(tdLoja);
            tr.appendChild(tdTelefoneLoja);
            tr.appendChild(tdTipo);
            tr.appendChild(tdQuantidade);
            tr.appendChild(tdPrecoUnitario);
            tr.appendChild(tdPrecoTotal);

            tbody.appendChild(tr);

        }
    }
}

function formataData(data){
    const date = new Date(data);
    const mes = date.getMonth() + 1;
    const dia = date.getDate();
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

function formataPreco(preco){
    let precoFormatado = preco.toFixed(2);
    precoFormatado = precoFormatado.toString();
    precoFormatado = precoFormatado.replace(".",",");
    return `R$ ${precoFormatado}`;
}

function calculaEntradaSaidaSaldo(){
    let entrada = 0;
    let saida = 0;

    for(let operacoes of json){
        if(operacoes.type == "IN"){
            entrada += operacoes.price;
        }else if(operacoes.type == "OUT"){
            saida += operacoes.price;
        }
    }
    const saldo = entrada - saida;

    const entradaId = document.querySelector("#entrada");
    const saidaId = document.querySelector("#saida");
    const saldoId = document.querySelector("#saldo");

    entradaId.innerHTML = `Total de entradas: ${formataPreco(entrada)}`;
    saidaId.innerHTML = `Total de saídas: ${formataPreco(saida)}`;
    saldoId.innerHTML = `Saldo: ${formataPreco(saldo)}`;
}