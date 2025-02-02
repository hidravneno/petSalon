document.addEventListener("DOMContentLoaded", function () {
  let pets = JSON.parse(localStorage.getItem("pets")) || [];
  let currentEditIndex = null;

  // Colores posibles para las tarjetas
  const cardColors = ["#90cbdf", "#69e198", "#faf85c"];

  // Función para guardar las mascotas en el localStorage
  function savePetsToLocalStorage() {
    localStorage.setItem("pets", JSON.stringify(pets));
  }

  // Función para leer servicios desde localStorage
  function read() {
    let data = localStorage.getItem("services");
    if (!data) {
      return [];
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing services data:", e);
      return [];
    }
  }

  // Función para obtener servicios y agregarlos al dropdown
  function getServices() {
    console.log("getServices function");

    let services = read();
    let option = "";

    for (let i = 0; i < services.length; i++) {
      let service = services[i];
      option += `<option value="${service.service}">${service.service} - $ ${service.price}</option>`;
    }

    $("#service").append(option);
  }

  // Función para obtener el siguiente ID secuencial
  function getNextId() {
    let currentId = localStorage.getItem("currentId");
    if (!currentId) {
      currentId = 1;  // Si no hay ningún ID, empieza desde 1
    } else {
      currentId = parseInt(currentId) + 1;  // Incrementa el ID
    }
    localStorage.setItem("currentId", currentId);  // Guarda el nuevo ID en el localStorage
    return currentId;
  }

  // Función para mostrar el total de mascotas
  function displayTotalPets() {
    let totalPets = pets.length;
    let totalPetsElement = document.getElementById("totalPets");
    if (totalPetsElement) {
      totalPetsElement.innerText = totalPets;
    }

    let dogCount = pets.filter((pet) => pet.type === "dog").length;
    let catCount = pets.filter((pet) => pet.type === "cat").length;
    let birdCount = pets.filter((pet) => pet.type === "bird").length;

    document.getElementById("dogCount").innerText = dogCount;
    document.getElementById("catCount").innerText = catCount;
    document.getElementById("birdCount").innerText = birdCount;
  }

  // Función para mostrar las tarjetas de mascotas
  function displayPetCards() {
    let petList = document.getElementById("petList");
    if (petList) {
      petList.innerHTML = "";
      for (let i = 0; i < pets.length; i++) {
        let petCard = document.createElement("div");
        petCard.className = "pet-card";
        let randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];
        petCard.style.backgroundColor = randomColor;
        petCard.innerHTML = ` 
          <h3>${pets[i].name} (ID: ${pets[i].id})</h3>
          <p>Age: ${pets[i].age}</p>
          <p>Gender: ${pets[i].gender}</p>
          <p>Type: ${pets[i].type}</p>
          <p>Service: ${pets[i].service}</p>
          <p>Breed: ${pets[i].breed}</p>
          <button class="edit-btn" data-index="${i}">Edit</button>
          <button class="delete-btn" data-index="${i}">Delete</button>
        `;
        petList.appendChild(petCard);
      }

      document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", openEditModal);
      });

      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", function (event) {
          let index = event.target.getAttribute("data-index");
          deletePet(index);
        });
      });
    }
  }

  // Función para abrir el modal de edición
  function openEditModal(event) {
    currentEditIndex = event.target.getAttribute("data-index");
    let pet = pets[currentEditIndex];

    document.getElementById("editName").value = pet.name;
    document.getElementById("editAge").value = pet.age;
    document.getElementById("editGender").value = pet.gender;
    document.getElementById("editType").value = pet.type;
    document.getElementById("editService").value = pet.service;
    document.getElementById("editBreed").value = pet.breed;

    document.getElementById("modal").style.display = "flex";
  }

  // Función para cerrar el modal
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  // Evento para el formulario de edición
  document
    .getElementById("editForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let name = document.getElementById("editName").value;
      let age = parseInt(document.getElementById("editAge").value);
      let gender = document.getElementById("editGender").value;
      let type = document.getElementById("editType").value;
      let service = document.getElementById("editService").value;
      let breed = document.getElementById("editBreed").value;

      if (!name || !age || !gender || !type || !service || !breed) {
        alert("Please fill in all fields.");
        return;
      }

      pets[currentEditIndex] = {
        id: pets[currentEditIndex].id,
        name: name,
        age: age,
        gender: gender,
        type: type,
        service: service,
        breed: breed,
      };

      savePetsToLocalStorage();
      displayTotalPets();
      displayPetCards();
      closeModal();
    });

  // Función para eliminar una mascota
  function deletePet(index) {
    if (confirm("Are you sure you want to delete this pet?")) {
      pets.splice(index, 1);
      savePetsToLocalStorage();
      displayTotalPets();
      displayPetCards();
    }
  }

  // Evento para el formulario de registro
  let petForm = document.getElementById("petForm");
  if (petForm) {
    petForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let name = document.getElementById("name").value;
      let age = parseInt(document.getElementById("age").value);
      let gender = document.getElementById("gender").value;
      let type = document.getElementById("type").value;
      let service = document.getElementById("service").value;
      let breed = document.getElementById("breed").value;

      if (!name || !age || !gender || !type || !service || !breed) {
        alert("Please fill in all fields.");
        return;
      }

      let newPet = {
        id: getNextId(),  // Usar el ID secuencial
        name: name,
        age: age,
        gender: gender,
        type: type,
        service: service,
        breed: breed,
      };

      pets.push(newPet);
      savePetsToLocalStorage();
      displayTotalPets();
      displayPetCards();
      petForm.reset();
    });
  }

  // Inicializar la visualización de servicios y mascotas
  getServices(); // Cargar los servicios al dropdown
  displayTotalPets();
  displayPetCards();

  // Eventos para cerrar el modal
  document.querySelector(".close").addEventListener("click", closeModal);

  window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("modal")) {
      closeModal();
    }
  });
});
