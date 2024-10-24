document.addEventListener("DOMContentLoaded", function() {
    const procesarBtn = document.getElementById('procesarBtn');
    procesarBtn.addEventListener('click', manipularCadena);
});

function manipularCadena() {
    const cadena = document.getElementById('cadena').value;

    if (cadena === "") {
        alert("Por favor, ingresa una cadena.");
        return;
    }

    // Longitud de la cadena
    document.getElementById('longitud').textContent = "Longitud: " + cadena.length;

    // Convertir a mayúsculas
    document.getElementById('mayusculas').textContent = "En mayúsculas: " + cadena.toUpperCase();

    // Convertir a minúsculas
    document.getElementById('minusculas').textContent = "En minúsculas: " + cadena.toLowerCase();

    // Extraer subcadena (primeros 5 caracteres)
    document.getElementById('subcadena').textContent = "Primeros 5 caracteres: " + cadena.substring(0, 5);

    // charAt
    document.getElementById('charAt').textContent = "charAt(1): " + cadena.charAt(1);

    // charCodeAt
    document.getElementById('charCodeAt').textContent = "charCodeAt(1): " + cadena.charCodeAt(1);

    // at (índice negativo)
    document.getElementById('at').textContent = "at(-1): " + cadena.at(-1);

    // slice
    document.getElementById('slice').textContent = "slice(0, 4): " + cadena.slice(0, 4);

    // substring
    document.getElementById('substring').textContent = "substring(0, 4): " + cadena.substring(0, 4);

    // substr
    document.getElementById('substr').textContent = "substr(0, 4): " + cadena.substr(0, 4);

    // concat
    document.getElementById('concat').textContent = "concat(): " + cadena.concat(" Mundo");

    // trim
    document.getElementById('trim').textContent = "trim(): " + cadena.trim();

    // padStart
    document.getElementById('padStart').textContent = "padStart(10, '0'): " + cadena.padStart(10, "0");

    // padEnd
    document.getElementById('padEnd').textContent = "padEnd(10, '0'): " + cadena.padEnd(10, "0");

    // repeat
    document.getElementById('repeat').textContent = "repeat(3): " + cadena.repeat(3);

    // replace
    document.getElementById('replace').textContent = "replace('Hola', 'Adiós'): " + cadena.replace("Hola", "Adiós");

    // replaceAll
    document.getElementById('replaceAll').textContent = "replaceAll('Hola', 'Adiós'): " + cadena.replaceAll("Hola", "Adiós");

    // split
    document.getElementById('split').textContent = "split(' '): " + cadena.split(" ").join(", ");
}
