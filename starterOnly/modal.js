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

//modification spécifique du message d'erreur pour chaque input du formulaire
document.querySelectorAll('input').forEach(item => {
  item.addEventListener('invalid', function (event) {
    if (event.target.validity.valueMissing) {
      let input = this.id;
      console.log("input: " + input);
      let errorMessage = "";
      switch (input) {
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
  const formData = new FormData(form);
  const entries = formData.entries();
  const data = Object.fromEntries(entries);
  console.log(data);

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
    //le formulaire passe les tests : il disparait après que les informations soient stockées dans finalData
    //use JSON.stringify to convert data into a string that can now be sent to a server
    finalData = JSON.stringify(data);
    console.log("finalData");
    console.log(finalData);
    alert("Merci! Votre réservation a été reçue!");
    modalbg.style.display = "none";
  }
}

