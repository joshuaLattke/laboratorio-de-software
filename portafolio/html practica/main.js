// Selecciona los elementos del formulario
const nameInput = document.getElementById('nombre');
const lastNameInput = document.getElementById('apellido');
const emailInput = document.getElementById('correo');
const contraseñaInput = document.getElementById('contraseña');
const terminosInput = document.getElementById('terminos');
const jsonOutput = document.getElementById('jsonOutput');
const registrationForm = document.getElementById('registrationForm');

// Función para actualizar y mostrar el JSON dinámicamente
function updateJson() {
    const formData = {
        nombre: nameInput.value.trim(), // Remueve espacios en blanco al principio y al final
        apellido: lastNameInput.value.trim(),
        correo: emailInput.value.trim(),
        contraseña: contraseñaInput.value.trim(),
        terminos: terminosInput.checked // Captura si los términos han sido aceptados
    };

    // Convierte el objeto a formato JSON
    const jsonData = JSON.stringify(formData, null, 2); // Formato con indentación

    // Muestra el JSON en el elemento <pre>
    jsonOutput.textContent = jsonData;
}

// Escucha el evento de envío del formulario
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue

    updateJson(); // Actualiza y muestra el JSON

    // Puedes añadir lógica adicional aquí si necesitas enviar el JSON a un servidor
});

// También sigue mostrando el JSON mientras el usuario ingresa datos
nameInput.addEventListener('input', updateJson);
lastNameInput.addEventListener('input', updateJson);
emailInput.addEventListener('input', updateJson);
contraseñaInput.addEventListener('input', updateJson);
terminosInput.addEventListener('change', updateJson);