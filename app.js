// La URL exacta de tu webhook de Make
const webhookUrl = "https://hook.us2.make.com/unm8bviipvxpf81ii44ta6kn91cijfvd";

// Referencias a los elementos del HTML
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Detectar clic en el botón de enviar
sendButton.addEventListener("click", enviarMensaje);

// También enviar con la tecla Enter
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        enviarMensaje();
    }
});

async function enviarMensaje() {
    const mensaje = userInput.value.trim();
    if (mensaje === "") return;

    // 1. Mostrar el mensaje del usuario en la pantalla
    chatBox.innerHTML += `<p><strong>Tú:</strong> ${mensaje}</p>`;
    userInput.value = ""; // Limpiar la caja de texto
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll hacia abajo

    // 2. Mostrar indicador de carga
    const typingIndicator = document.createElement("p");
    typingIndicator.innerHTML = "<em>Procesando tu turno...</em>";
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // 3. Enviar la petición POST al Webhook de Make
        const respuesta = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // Enviamos el dato bajo la variable "message"
            body: JSON.stringify({ message: mensaje }) 
        });

        // 4. Leer la respuesta de Make (el texto que pones en Webhook Response)
        const botResponseText = await respuesta.text();

        // 5. Quitar el "Procesando..." y mostrar la respuesta final del bot
        typingIndicator.remove();
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${botResponseText}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        // Manejo de errores si Make está apagado o falla el internet
        console.error("Error al conectar con Make:", error);
        typingIndicator.remove();
        chatBox.innerHTML += `<p style="color: red;"><strong>Error:</strong> El sistema de turnos no está disponible ahora mismo.</p>`;
    }
}