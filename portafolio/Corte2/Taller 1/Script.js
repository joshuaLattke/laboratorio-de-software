// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById('button');

    // Arreglo de 5 niveles
    const array = [
        [
            [1, 2, [3, 4, [5, 6]], 7],
            [8, 9, [10, 11, [12, 13]], 14]
        ],
        [
            [15, 16, [17, 18, [19, 20]], 21],
            [22, 23, [24, 25, [26, 27]], 28]
        ]
    ];

    // Función para aplanar el arreglo a un solo nivel
    function aplanarArreglo(arr) {
        return arr.reduce((flat, toFlatten) => 
            flat.concat(Array.isArray(toFlatten) ? aplanarArreglo(toFlatten) : toFlatten), []);
    }

    // Ejecuta las operaciones y actualiza el HTML con los resultados
    button.addEventListener('click', function() {
        const arregloAplanado = aplanarArreglo(array);

        // Realizar operaciones
        const sumatoriaTotal = arregloAplanado.reduce((sum, num) => sum + num, 0);
        const productoriaTotal = arregloAplanado.reduce((product, num) => product * num, 1);
        const sumaParcialCinco = arregloAplanado.slice(0, 5).reduce((sum, num) => sum + num, 0);
        const sumaParcialDiez = arregloAplanado.slice(0, 10).reduce((sum, num) => sum + num, 0);
        const conteoMayorDiez = arregloAplanado.filter(num => num > 10).length;
        const conteoPares = arregloAplanado.filter(num => num % 2 === 0).length;
        const sumaPosicionesImpares = arregloAplanado
            .filter((_, index) => index % 2 !== 0)
            .reduce((sum, num) => sum + num, 0);
        const productoriaCinco = arregloAplanado.slice(0, 5).reduce((product, num) => product * num, 1);
        const sumaPosicionesPares = arregloAplanado
            .filter((_, index) => index % 2 === 0)
            .reduce((sum, num) => sum + num, 0);
        const promedioTotal = sumatoriaTotal / arregloAplanado.length;

        // Mostrar resultados en el HTML
        document.getElementById("sumatoria").textContent = sumatoriaTotal;
        document.getElementById("conteo").textContent = arregloAplanado.length;
        document.getElementById("productoria").textContent = productoriaTotal;
        document.getElementById("conteoPares").textContent = conteoPares;
        document.getElementById("mayoresDiez").textContent = conteoMayorDiez;
        document.getElementById("sumaParcialCinco").textContent = sumaParcialCinco;
        document.getElementById("sumaParcialDiez").textContent = sumaParcialDiez;
        document.getElementById("sumaPosicionesImpares").textContent = sumaPosicionesImpares;
        document.getElementById("productoriaCinco").textContent = productoriaCinco;
        document.getElementById("sumaPosicionesPares").textContent = sumaPosicionesPares;
    });
});
