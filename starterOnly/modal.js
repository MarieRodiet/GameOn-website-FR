// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.getElementById("form");
let finalData = null;

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}





//when cross is clicked, form needs to disappear
let close = document.querySelector(".close");
close.addEventListener("click", function () {
  modalbg.style.display = "none";
});

const first = document.querySelector('input[name="first"]');
const last = document.querySelector('input[name="last"]');
const email = document.querySelector('input[name="email"]');
const birthdate = document.querySelector('input[name="birthdate"]');
const quantity = document.querySelector('input[name="quantity"]');
const locationError = document.querySelector("#location-error");
const conditionError = document.querySelector("#condition-error");

first.addEventListener('invalid', function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
  }
});
last.addEventListener('invalid', function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Veuillez entrer 2 caractères ou plus pour le champ du nom.');
  }
});

email.addEventListener('invalid', function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Veuillez entrer une adresse email valide');
  }
});

birthdate.addEventListener('invalid', function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Veuillez entrer votre date de naissance');
  }
});

quantity.addEventListener('invalid', function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Veuillez entrer un chiffre');
  }
});


document.querySelectorAll('input').forEach(item => {
  item.addEventListener('change', function (event) {
    event.target.setCustomValidity('');
  });
});



function validateData(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const entries = formData.entries();
  const data = Object.fromEntries(entries);
  console.log(data);
  if (!data.location) {
    locationError.textContent = "Merci de selectionner le tournoi auquel vous souhaitez participer cette année!";
    locationError.style.fontSize = "16px";
    locationError.style.fontWeight = "900";

  }
  else if (!document.querySelector("#checkbox1").checked) {
    conditionError.textContent = "Merci de lire et d'accepter les conditions d'utilisation!";
    conditionError.style.fontSize = "16px";
    conditionError.style.display = "block";
    conditionError.style.paddingTop = "10px";
    conditionError.style.fontWeight = "900";
  }
  else {
    //use JSON.stringify to convert data into a string that can now be sent to a server
    finalData = JSON.stringify(data);
    console.log("finalData");
    console.log(finalData);
    alert("Merci! Votre réservation a été reçue!");
    modalbg.style.display = "none";
  }
}

