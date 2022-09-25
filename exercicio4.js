const dataAtual = new Date("2022-06-07T01:01:06.336Z"); 
const mesExtenso = retornaMesPorExtenso(dataAtual);
console.log(mesExtenso); // Junho

function retornaMesPorExtenso(dataAtual){
    dataMes = dataAtual.getUTCMonth()+1;
    if(dataMes == 1) return "janeiro";
    if(dataMes == 2) return "fevereiro";
    if(dataMes == 3) return "março";
    if(dataMes == 4) return "abril";
    if(dataMes == 5) return "maio";
    if(dataMes == 6) return "junho";
    if(dataMes == 7) return "julho";
    if(dataMes == 8) return "agosto";
    if(dataMes == 9) return "setembro";
    if(dataMes == 10) return "outubro";
    if(dataMes == 11) return "novembro";
    if(dataMes == 12) return "dezembro";
}