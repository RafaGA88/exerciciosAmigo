const dataFormatada = formataData(new Date("2022-06-07T01:01:06.336Z")); // 2022-06-07T01:01:06.336Z
console.log(dataFormatada); // resultado: 07/06/2022

function formataData(data){
    let dia = data.getDate()+1;
    let mes = data.getMonth()+1;
    let ano = data.getFullYear();

    dia = dia < 10 ? "0" + dia : dia;
    mes = mes < 10 ? "0" + mes : mes;

    return `${dia}
${dia}/${mes}
${dia}/${mes}/${ano}`;
}