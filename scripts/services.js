// Using jQuery

// Constructor
function Service(description, price) {
    // Definición de un constructor vacío (sin propiedades aún)
  }
  
  // Register and display
  function register() {
    console.log("A new service was added"); // Muestra un mensaje en la consola cuando se registra un servicio.
  }
  
  // Inicialización
  function init() {
    // Asocia la función 'register' al botón con ID "registerBtn" en el evento de clic
    $("#registerBtn").on("click", register);
  }
  
  // Ejecuta la función init cuando la página ha cargado
  window.onload = init;
  