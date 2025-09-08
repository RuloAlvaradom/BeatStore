// *REGISTRO* //
document.addEventListener("DOMContentLoaded", () => { 
    const form = document.getElementById("formRegistro"); //esta linea asegura que el código no corra antes de que los elementos estén disponibles.

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita que el formulario se envíe directamente

        // Obtener valores
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!nombre || !correo || !password || !confirmPassword) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (!correo.includes("@") || !correo.includes(".")) {
            alert("Ingresa un correo electrónico válido.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        alert("Registro exitoso. ¡Bienvenido a BeatStore!");
        form.reset(); 
    });
});

// * CONTACTO * //
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContacto");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !correo || !mensaje) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (!correo.includes("@") || !correo.includes(".")) {
            alert("Ingresa un correo electrónico válido.");
            return;
        }

        alert("Mensaje enviado correctamente. ¡Gracias por contactarnos!");
        form.reset();
    });
});


