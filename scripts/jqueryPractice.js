console.log("Hello from jQuery Practice!");
// JS vs jQuery
//getting an element
document.getElementById("results");
$("#results");

document.getElementsByTagName("p");
$("p");

document.getElementsByClassName("with-border");
$(".with-border");

// ID SELECTORES
let redParagraph = $("#red")
  .css("background-color", "red")
  .css("color", "white");
console.log("my paragraph", redParagraph);

let blueParagraph = $("#blue")
  .css("background-color", "blue")
  .css("color", "white");
console.log("my paragraph", blueParagraph);

// CLASS SELECTORS
let myParagraphWithBorder = $(".with-border");
myParagraphWithBorder.css("border", "5px dashed yellow");
myParagraphWithBorder.click(function () {
  console.log("Clicked");
  $(this).addClass("bg-gray");
});

// TAG SELECTORS
let myParagraphs = $("p");
myParagraphs.css("cursor", "pointer");

// SIMPLE AND COMMON FUNCTION
function register() {
  let testEntry = $("#testInput").val();
  $("#results").append(`<li>${testEntry}</li>`);
}

// EVENTS
$("#registerBtn").click(register);

// SIMPLE AND COMMON FUNCTION
function clickMe() {
  console.log("Click me");
  $("p:first").hide();
  //$("p:first").show();
  $("p:last").css("border", "3px solid black");
}

$("#newBtn").on("click", clickMe);

// ANIMATIONS
function hideName() {
  $("#user-name").slideUp(2000); 
}

function showName() {
  $("#user-name").slideDown(2000); // Muestra el elemento con ID "user-name" con una animación deslizante hacia abajo en 2 segundos (2000 ms).
}

// Asignar eventos a los botones "Show user name" y "Hide user name"
$(".btn-dark").eq(0).click(showName);
$(".btn-dark").eq(1).click(hideName);
