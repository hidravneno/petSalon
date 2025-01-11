$(document).ready(function () {
  // Constructor para objetos de servicio
  function Service(service, price) {
    this.service = service;
    this.price = price;
  }

  // Función para guardar los servicios en localStorage
  function save(services) {
    localStorage.setItem("services", JSON.stringify(services));
  }

  // Función para leer los servicios desde localStorage
  function readServices() {
    let services = localStorage.getItem("services");
    return services ? JSON.parse(services) : [];  // Retorna un arreglo vacío si no se encuentran servicios
  }

  // Función de validación del servicio
  function validService(service) {
    let isValidPrice = true;

    if (service.price === "" || isNaN(service.price) || service.price <= 0) { // Si el precio es vacío o inválido
      isValidPrice = false;
      $("#price").css("border", "1px solid red");
    } else {
      $("#price").css("border", "");
    }

    return isValidPrice; // Validar solo el precio
  }

  // Función para mostrar los servicios en la página
  function displayServices() {
    let services = readServices();
    let serviceTableBody = $("#servicesTable tbody");
    serviceTableBody.empty(); // Limpiar la tabla antes de agregar los servicios

    services.forEach((service, index) => {
      let row = $("<tr></tr>");
      row.append($("<td></td>").text(service.service));
      row.append($("<td></td>").text(`$${service.price}`));
      let deleteButton = $("<button>Delete</button>").attr("data-index", index).addClass("btn btn-danger btn-sm");
      let actionsCell = $("<td></td>").append(deleteButton);
      row.append(actionsCell);
      serviceTableBody.append(row);
    });

    // Agregar manejador de eventos para los botones de eliminar
    $("#servicesTable button").click(function () {
      let index = $(this).attr("data-index");
      deleteService(index);
    });
  }

  // Función para eliminar un servicio
  function deleteService(index) {
    let services = readServices();
    services.splice(index, 1);
    save(services); // Llamar a la función save para guardar los cambios
    displayServices();
  }

  // Manejar el formulario de registro de servicios
  $("#serviceForm").submit(function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    let service = $("#service").val();
    let price = parseFloat($("#price").val());

    // Validaciones
    if (service === "" || isNaN(price) || price <= 0) {
      console.log("Validación fallida: Servicio o precio inválido");
      $("#notification").text("Por favor, ingrese un servicio y un precio válidos.").addClass("alert alert-danger").show();
      return;
    }

    // Crear un nuevo servicio
    let newService = new Service(service, price);
    console.log("Nuevo servicio creado:", newService);

    // Guardar el servicio en localStorage usando la función save
    let services = readServices();
    services.push(newService);
    save(services); // Llamar a la función save para guardar los servicios

    console.log("Servicio guardado en localStorage:", services);

    // Notificación de éxito
    $("#notification").text("¡Servicio registrado con éxito!").removeClass("alert-danger").addClass("alert alert-success").show();

    // Limpiar el formulario
    $("#serviceForm")[0].reset();

    // Mostrar los servicios actualizados
    displayServices();
  });

  // Mostrar los servicios cuando la página se carga
  displayServices();
});
