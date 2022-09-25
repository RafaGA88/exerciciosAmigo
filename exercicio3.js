const date = '2022-06-07T01:01:06.336Z';
const data = new Date(date);
console.log(diaMesAno(data));
console.log(comhora(data));

function diaMesAno(data){
    const dia = data.getDate()+1;
    const mes = data.getMonth()+1;
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

function comhora(data){

    const hora = data.getHours();
    const minutos = data.getMinutes();

    return `${diaMesAno(data)} ${hora}:${minutos}`;

    
}