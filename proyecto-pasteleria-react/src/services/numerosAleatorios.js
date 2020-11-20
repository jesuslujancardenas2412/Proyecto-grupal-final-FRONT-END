// GENERADOR DE NUMEROS ALEATORIOS SIN REPETIR (ID PRODUCTO)
export const arregloSinRepetir = (cantidad) => {
    let arreglo = [];
    let listo = false;
    let cont = 0;

    while (!listo) {
        // Retorna un entero aleatorio entre min (incluido) y max (excluido)
        // Math.floor(Math.random() * (max - min)) + min
        const aleatorio = Math.floor(Math.random() * (30 - 1) + 1);
        const rpta = arreglo.find((n) => n === aleatorio);
        if (!rpta) {
            arreglo.push(aleatorio);
            cont++;
        }
        if (arreglo.length === cantidad) listo = true;
    }
    return arreglo;
};