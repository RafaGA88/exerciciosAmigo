let json;

fetch("json/guias.json")
    .then(resposta => resposta.text())
    .then((jsonp) => {
        json = JSON.parse(jsonp);
    });

const tbody = document.querySelector("#tbody");
const input = document.querySelector("#inputPesquisa");
input.addEventListener("keypress", function (e) {
    
    if (e.keyCode === 13) {
        tbody.innerHTML = " ";
        e.preventDefault();
        pesquisa(input.value);
    }
});

function pesquisa(pesquisa) {

    let cont = 0;

    for (let i of json.guides) {
        if (i.patient.name == pesquisa) {
            constroiTabela(i);
            cont++;
        } else if (i.number == pesquisa) {
            constroiTabela(i);
            cont++;
        }
    }

    if(cont == 0){
        nenhumaGuia();
    }

}

function constroiTabela(paciente) {

    const tr = document.createElement("tr");
    const tbody = document.querySelector("#tbody");

    let tdNumber;
    let tdDate;
    let tdPatient;
    let tdInsurance;
    let tdPrice;

    for (let i in paciente) {
        if (i == "number") {
            tdNumber = document.createElement("td");
            tdNumber.innerText = paciente[i];
        }
        if (i == "start_date") {
            tdDate = document.createElement("td");
            tdDate.innerText = formataData(paciente[i]);
        }
        if (i == "patient") {
            tdPatient = document.createElement("td");
            tdPatient.appendChild(carregaThumb(paciente[i].thumb_url));
            tdPatient.setAttribute("style","width: 25%;")
            tdPatient.innerHTML += `  ${paciente[i].name}`;
        }
        if (i == "health_insurance") {
            tdInsurance = document.createElement("td");
            if(paciente[i].is_deleted){
                tdDate.setAttribute("title","Convênio Apagado");
                tdInsurance.innerHTML = `<p title="Convênio Apagado"><s>${paciente[i].name}<s></p>`;
            }else{
                tdInsurance.innerHTML = paciente[i].name;
            }
        }
        if (i == "price") {
            tdPrice = document.createElement("td");
            tdPrice.innerText = formataString(paciente[i].toString());
        }
    }
    tr.appendChild(tdDate);
    tr.appendChild(tdNumber);
    tr.appendChild(tdPatient);
    tr.appendChild(tdInsurance);
    tr.appendChild(tdPrice);

    tbody.appendChild(tr);

}

function formataData(data) {
    const date = new Date(data);
    const mes = date.getMonth() + 1;
    const dia = date.getDate();
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

function formataString(string) {
    return "R$ " + string.replace(".", ",");
}

function carregaThumb(thumb){

    if(thumb == undefined){
        thumb = "https://via.placeholder.com/150x150.jpg";
    }
    const img = document.createElement("img");
    img.setAttribute("style","border-radius: 100%; width: 15%;");
    img.setAttribute("class","img-fluid");
    img.setAttribute("src",thumb);

    return img;
}

const convenio = document.querySelector("#convenio");
convenio.addEventListener("change", function(e){
    tbody.innerHTML = " ";
    filtroConvenio(convenio.value);
});


function filtroConvenio(convenio){

    const pacientes = [];
    let cont = 0;

    for(let i of json.guides){
        if((i.health_insurance.name).toLowerCase().replace("á","a") == convenio){
            cont++;
            pacientes.push(i);
        }
    }
    for(let paciente of pacientes){
        constroiTabela(paciente);
    }

    if(cont == 0){
        nenhumaGuia();
    }
}

function nenhumaGuia(){
    const tbody = document.querySelector("#tbody");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.setAttribute("colspan", "5");
    td.setAttribute("class", "text-center");
    td.innerText = "Nenhuma guia encontrada";
    tr.appendChild(td);
    tbody.appendChild(tr);
}