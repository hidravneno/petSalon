let pets = []; // empty array

// Object literal
let petSalon = {
  name: "The Fashion Pet",
  address: {
    street: "Palm Ave",
    zip: "22333"
  },
  phone: "666-555-7777"
}

console.log(petSalon);

//creating the  pets
let pet1={
    name:"Scooby",
    age:60,
    gender:"male"
}
let pet2={
    name:"Scrappy",
    age:50,
    gender:"male"
}
let pet3={
    name:"Velma",
    age:40,
    gender:"male"
}

pets.push(pet1,pet2,pet3);
console.log(pets);

function displayNames(){
    console.log(pets[0].name);
    console.log(pets[1].name); 
    console.log(pets[2].name); 
    
    console.log("we have "+pets.length+" pets in the salon");
}

displayNames();