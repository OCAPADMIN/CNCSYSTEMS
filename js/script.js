// script.js

// Capturamos el formulario y el mensaje de confirmación
const formulario = document.getElementById("form-contacto");
const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

// Escuchamos el evento 'submit' del formulario
formulario.addEventListener("submit", function (e) {
    // Evitamos que la página se recargue
    e.preventDefault();

    // Mostramos el mensaje de confirmación
    mensajeConfirmacion.style.display = "block";

    // Limpiamos los campos del formulario
    formulario.reset();
});
