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


//le formulaire disparait lorsque la CROIX est cliquée
let close = document.querySelector(".close");
close.addEventListener("click", function () {
  modalbg.style.display = "none";
});

//les champs de saisies du formulaires
const first = document.querySelector('input[name="first"]');
const last = document.querySelector('input[name="last"]');
const email = document.querySelector('input[name="email"]');
const birthdate = document.querySelector('input[name="birthdate"]');
const quantity = document.querySelector('input[name="quantity"]');

//Verification de la date de naissance 
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
today = yyyy + '-' + mm + '-' + dd;
birthdate.setAttribute("max", today);


//modification spécifique du message d'erreur pour chaque input du formulaire
document.querySelectorAll('input').forEach(item => {
  item.addEventListener('change', function (event) {
    console.log("there was a change");
    let errorMessage = "";
    let inputId = this.id;
    if (event.target.validity.valueMissing || event.target.validity.tooShort || event.target.validity.typeMismatch || event.target.value.rangeUnderflow) {
      document.getElementById(inputId).className = "invalid";
      console.log("invalid: " + inputId);
      switch (inputId) {
        case "first": errorMessage = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
          break;
        case "last": errorMessage = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
          break;
        case "email": errorMessage = 'Veuillez entrer une adresse email valide';
          break;
        case "birthdate": errorMessage = 'Veuillez entrer votre date de naissance';
          break;
        case "quantity": errorMessage = 'Veuillez entrer un chiffre';
          break;
        default: errorMessage = 'Veuillez remplir ce champ';
      }
      event.target.setCustomValidity(errorMessage);
      console.log(event.target);
    }
    else if (event.target.validity.valid) {
      document.getElementById(inputId).className = "valid";
      console.log("valid: " + inputId);
    }
  })
})

//faire un reset du message d'erreur afin que le formulaire soit validé après correction
document.querySelectorAll('input').forEach(item => {
  item.addEventListener('change', function (event) {
    event.target.setCustomValidity('');
  });
});


//les messages d'erreurs des deux derniers input du formulaire
const locationError = document.querySelector("#location-error");
const conditionError = document.querySelector("#condition-error");

form.addEventListener("submit", validateData);

function validateData(event) {
  event.preventDefault();
  /*Creation d'un object FormData pour avoir un ensemble de 
  paires clé/valeur représentant les champs du formulaire et leurs valeurs */
  const formData = new FormData(form);
  const entries = formData.entries();
  const data = Object.fromEntries(entries);
  //data.location doit être selectionné
  if (!data.location) {
    locationError.textContent = "Merci de selectionner le tournoi auquel vous souhaitez participer cette année!";
    locationError.className = "locationError";
  }
  //checkbox1 doit être selectionné
  else if (!document.querySelector("#checkbox1").checked) {
    conditionError.textContent = "Merci de lire et d'accepter les conditions d'utilisation!";
    conditionError.className = "conditionError";
  }
  else {
    alert("Merci! Votre réservation a été reçue!");
    console.log("formulaire accepté: " + data);
    modalbg.style.display = "none";
  }


}

