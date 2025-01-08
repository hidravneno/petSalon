// Using jQuery

$(document).ready(function () {
  // Constructor for service objects
  function Service(service, description, price) {
    this.service = service;
    this.description = description;
    this.price = price;
  }

  // Function to validate service
  function validService(service) {
    let isValidDes = true;
    let isValidPrice = true;

    if (service.description === "") { // if the description is empty
      isValidDes = false;
      $("#description").css("border", "1px solid red");
    } else {
      $("#description").css("border", "");
    }

    if (service.price === "" || isNaN(service.price) || service.price <= 0) { // if the price is empty or invalid
      isValidPrice = false;
      $("#price").css("border", "1px solid red");
    } else {
      $("#price").css("border", "");
    }

    return isValidDes && isValidPrice; // && = AND
  }

  // Function to display services on the page
  function displayServices() {
    let services = JSON.parse(localStorage.getItem("services")) || [];
    let serviceTableBody = $("#servicesTable tbody");
    serviceTableBody.empty(); // Clear the table before adding services

    services.forEach((service, index) => {
      let row = $("<tr></tr>");
      row.append($("<td></td>").text(service.service));
      row.append($("<td></td>").text(service.description));
      row.append($("<td></td>").text(`$${service.price}`));
      let deleteButton = $("<button>Delete</button>").attr("data-index", index);
      let actionsCell = $("<td></td>").append(deleteButton);
      row.append(actionsCell);
      serviceTableBody.append(row);
    });

    // Add event handler for delete buttons
    $("#servicesTable button").click(function () {
      let index = $(this).attr("data-index");
      deleteService(index);
    });
  }

  // Function to delete a service
  function deleteService(index) {
    let services = JSON.parse(localStorage.getItem("services")) || [];
    services.splice(index, 1);
    localStorage.setItem("services", JSON.stringify(services));
    displayServices();
  }

  // Handle the service registration form
  $("#serviceForm").submit(function (event) {
    event.preventDefault();

    // Get form values
    let service = $("#service").val();
    let description = $("#description").val();
    let price = parseFloat($("#price").val());

    // Validations
    if (service === "" || description === "" || isNaN(price) || price <= 0) {
      console.log("Validation failed: Invalid service, description or price");
      $("#notification").text("Please enter a valid service, description and price.").css("color", "red");
      return;
    }

    // Create a new service
    let newService = new Service(service, description, price);
    console.log("New service created:", newService);

    // Save the service in localStorage using the save function
    let services = JSON.parse(localStorage.getItem("services")) || [];
    services.push(newService);
    save(services); // Call the save function
    console.log("Service saved to localStorage:", services);

    // Success notification
    $("#notification").text("Service registered successfully!").css("color", "green");

    // Clear the form
    $("#serviceForm")[0].reset();

    // Display updated services
    displayServices();
  });

  // Function to initialize events and settings
  function init() {
    $("#registerBtn").on("click", register);
    $("#desRequirementText").hide();
    $("#priceRequirementText").hide();
  }

  // Initialize events and settings when the window loads
  window.onload = init;

  // Display services when the page loads
  displayServices();
});