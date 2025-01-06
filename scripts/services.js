// Using jQuery

$(document).ready(function () {
  // Constructor para los objetos de servicios
  // Constructor for service objects
  function Service(description, price) {
    this.description = description;
    this.price = price;
  }

  // Manejar el formulario de registro de servicios
  // Handle the service registration form
  $("#serviceForm").submit(function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    // Get form values
    let description = $("#description").val();
    let price = parseFloat($("#price").val());

    // Validaciones
    // Validations
    if (description === "" || isNaN(price) || price <= 0) {
      $("#notification").text("Please enter a valid description and price.").css("color", "red");
      return;
    }

    // Crear un nuevo servicio
    // Create a new service
    let newService = new Service(description, price);

    // Guardar el servicio en el localStorage (opcional)
    // Save the service in localStorage (optional)
    let services = JSON.parse(localStorage.getItem("services")) || [];
    services.push(newService);
    localStorage.setItem("services", JSON.stringify(services));

    // Notificación de éxito
    // Success notification
    $("#notification").text("Service registered successfully!").css("color", "green");

    // Limpiar el formulario
    // Clear the form
    $("#serviceForm")[0].reset();
  });
});