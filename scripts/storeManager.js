function read() {
  let data = localStorage.getItem("services"); // Retrieves the JSON string from localStorage
  console.log(data); // Displays the retrieved JSON string
  
  if (!data) {
    return []; // If there is no data, return an empty array
  }

  try {
    let list = JSON.parse(data); // Converts the JSON string back into an object
    return list; // Returns the object
  } catch (e) {
    console.error("Error parsing JSON from localStorage:", e);
    return []; // If an error occurs, return an empty array
  }
}
