let operacionSeleccionada = null;

document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById('button');
    const button2 = document.getElementById('button2');
    const buttonSuma = document.getElementById('ButtonSuma');
    const buttonResta = document.getElementById('ButtonResta');
    const buttonMultiplicacion = document.getElementById('ButtonMultiplicacion');
    const buttonDivision = document.getElementById('ButtonDivision');
    const buttonResultado = document.getElementById('buttonResultado');
    const buttonArchivo=document.getElementById('procesarArchivo');
    
    
       // Asignar eventos a los botones
       button.addEventListener('click', leerDatos);
       button2.addEventListener('click', leerArchivo);
       buttonArchivo.addEventListener('click',procesarArchivoSumatoria);
       
       buttonSuma.addEventListener('click', () => {
        operacionSeleccionada = '+';
        mostrarOperacionSeleccionada();
    });
    buttonResta.addEventListener('click', () => {   
        operacionSeleccionada = '-';    
        mostrarOperacionSeleccionada();
    });
    buttonMultiplicacion.addEventListener('click', () => {
        operacionSeleccionada = '*';
        mostrarOperacionSeleccionada();
    });
    buttonDivision.addEventListener('click', () => {
        operacionSeleccionada = '/';
        mostrarOperacionSeleccionada();
    });

    buttonResultado.addEventListener('click', realizarOperacion);
});

function mostrarOperacionSeleccionada() {
    const mensaje = `Operación seleccionada: ${operacionSeleccionada}`;
    console.log(mensaje);  
    document.getElementById('operacion_seleccionada').innerText = mensaje;  
}

function leerArchivo() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];  // Obtén el primer archivo seleccionado
    
    if (!file) {
        alert("Por favor selecciona un archivo primero.");
        return;  // Detener si no se selecciona ningún archivo
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const contenido = event.target.result;
        console.log("Contenido del archivo:", contenido);  // Imprimir el contenido en la consola para verificar

        // Mostrar el contenido en el div
        document.getElementById('resultado_2').innerText = contenido;
    };

    reader.readAsText(file);  // Lee el archivo como texto
}


function leerDatos() {
    const cadena = document.getElementById('cadena').value.trim();

    if (cadena === "") {
        alert("Por favor, ingresa un número o letras.");
        return;
    }

   
    if (/^[0-9]*\.?[0-9]+$/.test(cadena)) {
        convertirBaseNumericaAString(parseFloat(cadena));  
         }
    
    else if (/^[A-Z0-9]+\.[A-Z0-9]+$/.test(cadena)) {
        convertirCadena(cadena); 
    }
   
    else if (/^[A-Z0-9]+$/.test(cadena)) {
        convertirCadena(cadena);  
    } 
    else {
        alert("Entrada no válida. Ingresa un número o letras mayúsculas o una combinación válida.");
    }
}

function realizarOperacion() {
    const cadenaBase1 = document.getElementById('cadenaBase1').value.trim();  
    const cadenaBase2 = document.getElementById('cadenaBase2').value.trim();  

    
    if (!cadenaBase1 || !cadenaBase2) {
        alert("Por favor, ingresa ambos números.");
        return;
    }

    
    const base1 = parseInt(prompt("Ingresa la base del primer número (entre 2 y 36)"));
    if (isNaN(base1) || base1 < 2 || base1 > 36) {
        alert("Por favor, ingresa una base válida para el primer número (entre 2 y 36).");
        return;
    }

    
    const base2 = parseInt(prompt("Ingresa la base del segundo número (entre 2 y 36)"));
    if (isNaN(base2) || base2 < 2 || base2 > 36) {
        alert("Por favor, ingresa una base válida para el segundo número (entre 2 y 36).");
        return;
    }

    
    function esNumeroValidoParaBase(cadena, base) {
        const caracteresValidos = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, base);
        const regex = new RegExp(`^[${caracteresValidos}]+$`, 'i');  
        return regex.test(cadena);
    }

    
    if (!esNumeroValidoParaBase(cadenaBase1, base1)) {
        alert(`El número ${cadenaBase1} no es válido para la base ${base1}.`);
        return;
    }

    if (!esNumeroValidoParaBase(cadenaBase2, base2)) {
        alert(`El número ${cadenaBase2} no es válido para la base ${base2}.`);
        return;
    }

    
    let numero1, numero2;
    try {
        numero1 = parseInt(cadenaBase1, base1);
        numero2 = parseInt(cadenaBase2, base2);

    
        if (isNaN(numero1) || isNaN(numero2)) {
            throw new Error("Conversión inválida.");
        }
    } catch (error) {
        console.log("Error al convertir los números:", error);
        alert("Por favor, ingresa números válidos en las bases seleccionadas.");
        return;
    }

    
    console.log(`Número 1 convertido a base 10: ${numero1}`);
    console.log(`Número 2 convertido a base 10: ${numero2}`);

    let resultadoBase10;

    
    switch (operacionSeleccionada) {
        case '+':
            resultadoBase10 = numero1 + numero2;
            break;
        case '-':
            resultadoBase10 = numero1 - numero2;
            break;
        case '*':
            resultadoBase10 = numero1 * numero2;
            break;
        case '/':
            if (numero2 === 0) {
                alert("Error: No se puede dividir por cero.");
                return;
            }
            resultadoBase10 = numero1 / numero2;
            break;
        default:
            alert("Operación no válida.");
            return;
    }

    
    document.getElementById('resultado_3').innerHTML = `Resultado en base 10: ${resultadoBase10}`;
}
   

function convertirCadena(cadena) {
    let resultados = '';

    
    if (cadena.includes('.')) {
        const partes = cadena.split('.');
        for (let base = 2; base <= 36; base++) {
            try {
                const parteEntera = parseInt(partes[0], base);  
                const parteDecimal = parseInt(partes[1], base) / Math.pow(base, partes[1].length);  

                if (isNaN(parteEntera) || isNaN(parteDecimal)) {
                    resultados += `Base ${base}: Conversión inválida<br>`;
                } else {
                    const resultado = parteEntera + parteDecimal;
                    resultados += `Base ${base}: ${resultado}<br>`;
                }
            } catch (error) {
                resultados += `Base ${base}: Conversión inválida<br>`;
            }
        }
    } 
   
    else {
        for (let base = 2; base <= 36; base++) {
            try {
                const numeroConvertido = parseInt(cadena, base);  
                
                if (isNaN(numeroConvertido)) {
                    resultados += `Base ${base}: Conversión inválida<br>`;
                } else {
                    resultados += `Base ${base}: ${numeroConvertido}<br>`;
                }
            } catch (error) {
                resultados += `Base ${base}: Conversión inválida<br>`;
            }
        }
    }

    document.getElementById('resultados_1').innerHTML = `La cadena ${cadena} convertida en diferentes bases es:<br>${resultados}`;
}




function convertirBaseNumericaAString(numero) {
    let resultados = '';

    for (let base = 2; base <= 36; base++) {
        resultados += `Base ${base}: ${convertirNumeroBase(numero, base)}<br>`;
    }

    document.getElementById('resultados_1').innerHTML = resultados;
}


function convertirNumeroBase(numero, base) {
    if (numero < 0) return '';
    let resultado = '';
    let cociente = Math.floor(numero); 
    let parteDecimal = numero - cociente; 

    while (cociente > 0) {
        let residuo = cociente % base;
        cociente = Math.floor(cociente / base);
        resultado = (residuo >= 10 ? String.fromCharCode(55 + residuo) : residuo) + resultado;
    }

    resultado = resultado === '' ? '0' : resultado;

    if (parteDecimal > 0) {
        resultado += '.';
        let precision = 5;
        while (parteDecimal > 0 && precision-- > 0) {
            parteDecimal *= base;
            let enteroDecimal = Math.floor(parteDecimal);
            resultado += (enteroDecimal >= 10 ? String.fromCharCode(55 + enteroDecimal) : enteroDecimal);
            parteDecimal -= enteroDecimal;
        }
    }

    return resultado;
}



function procesarArchivoSumatoria() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
    const contenido = event.target.result.trim().split('\n');
    let sumatoria = 0; 
    contenido.forEach(linea => {
        const [numero, base, baseSalida] = linea.split(' ').map(part => part.trim());

        let base10;

        if (numero.includes('.')) {
            base10 = parseFloat(parseInt(numero.split('.')[0], parseInt(base, 10))) + 
                     parseFloat("0." + parseInt(numero.split('.')[1], parseInt(base, 10)));
        } else {
            base10 = parseFloat(parseInt(numero, parseInt(base, 10)));
        }

        sumatoria += base10;

        if (baseSalida !== "10") {
            const numeroConvertido = base10.toString(parseInt(baseSalida, 10));
            console.log(`Número en base ${base}: ${numero} convertido a base ${baseSalida}: ${numeroConvertido}`);
        } else {
            console.log(`Número en base ${base}: ${numero} ya está en base 10`);
        }
    });

    document.getElementById('resultado_5').innerHTML = `La sumatoria de los números en base 10 es: ${sumatoria}`;
};

reader.readAsText(file);
}         

