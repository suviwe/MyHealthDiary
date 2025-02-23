
function toggleMenu() {
    let menu = document.querySelector(".nav-links");
    menu.classList.toggle("active");
  }
  
  
  //modaalin js
  // Haetaan modaalielementti
  const modal = document.getElementById("loginModal");
  //haetaan kirjaudu/rekisteröidy- linkki
  const openModalBtn = document.querySelector(".openModal");
  
  
  // Haetaan sulkupainike
  const closeBtn = document.querySelector(".close");
  
  // Haetaan Kirjaudu- ja Rekisteröidy-napit
  const loginBtn = document.getElementById("btn-login");
  const registerBtn = document.getElementById("btn-register");
  
  // Haetaan lomakkeen kentät
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  
  // Avaa modaali, kun Kirjaudu / Rekisteröidy -linkkiä painetaan
  openModalBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Estetään sivun uudelleenlataus
    modal.style.display = "flex"; // Näytetään modaali
  });
  
  // Sulkee modaalin, kun X-painiketta painetaan
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });
  
  // Sulkee modaalin, kun käyttäjä klikkaa modaalin ulkopuolelle
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  
  // Tarkistaa, että kaikki kentät on täytetty ennen kirjautumista
  function validateForm() {
    if (!username.value || !email.value || !password.value) {
      alert("Täytä kaikki kentät!");
      return false;
    }
    return true;
  }
  
  // Kun käyttäjä painaa Kirjaudu-nappia
  loginBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Estetään lomakkeen lähetys
    if (validateForm()) {
      alert("Kirjautuminen onnistui!");
      modal.style.display = "none"; // Suljetaan modaali onnistuneen kirjautumisen jälkeen
    }
  });
  
  // Kun käyttäjä painaa Rekisteröidy-nappia
  registerBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Estetään lomakkeen lähetys
    if (validateForm()) {
      alert("Rekisteröityminen onnistui!");
      modal.style.display = "none"; // Suljetaan modaali onnistuneen rekisteröitymisen jälkeen
    }
  });
  
  
  
  