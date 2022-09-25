
const arrayNumeros = [0, '1', '1.5', 2, 3, 4, 5, 6, 7, '8', 9];

for (let indice = 0; indice < arrayNumeros.length; indice++) {
    if (indice != 0) {
        arrayNumeros[indice] = typeof arrayNumeros[indice] == "string" ? Number(arrayNumeros[indice]) : arrayNumeros[indice];
        arrayNumeros[indice] += arrayNumeros[indice - 1];
        if (arrayNumeros[indice] % 2 != 0) {
            arrayNumeros.splice(indice - 1, 0, parseFloat(arrayNumeros[indice - 1] + 0.5));
        }
        indice++;
    }

}
console.log(arrayNumeros);




