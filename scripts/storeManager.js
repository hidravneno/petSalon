function save(item) {
  console.log(item); // obj
  let val = JSON.stringify(item);
  console.log(val); // JSON (string)
  localStorage.setItem("services", val);
}
