document.addEventListener("DOMContentLoaded", function () {
  let pets = JSON.parse(localStorage.getItem("pets")) || [];
  let currentEditIndex = null;

  let petSalon = {
    name: "The Fashion Pet",
    address: {
      street: "Palm Ave",
      zip: "22333",
    },
    phone: "666-555-7777",
  };

  console.log(petSalon);

  function savePetsToLocalStorage() {
    localStorage.setItem("pets", JSON.stringify(pets));
  }

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

  function displayPetCards() {
    let petList = document.getElementById("petList");
    if (petList) {
      petList.innerHTML = "";
      for (let i = 0; i < pets.length; i++) {
        let petCard = document.createElement("div");
        petCard.className = "pet-card";
        petCard.innerHTML = `
          <h3>${pets[i].name}</h3>
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

  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }

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

      pets[currentEditIndex] = {
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
      calculateAverageAge();
      closeModal();
    });

  function deletePet(index) {
    pets.splice(index, 1);
    savePetsToLocalStorage();
    displayTotalPets();
    displayPetCards();
    calculateAverageAge();
  }

  function calculateAverageAge() {
    let totalAge = 0;
    for (let i = 0; i < pets.length; i++) {
      totalAge += pets[i].age;
    }
    let averageAge = totalAge / pets.length;
    console.log("Average Age of Pets:", averageAge);
  }

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

      let newPet = {
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
      calculateAverageAge();
      petForm.reset();
    });
  }

  displayTotalPets();
  displayPetCards();
  calculateAverageAge();

  document.querySelector(".close").addEventListener("click", closeModal);

  window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("modal")) {
      closeModal();
    }
  });
});
