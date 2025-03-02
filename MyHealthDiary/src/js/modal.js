
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
  
  // Haetaan Kirjaudu- ja Rekisteröidy lomakkeet
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  //Haetaan Kirjaudu- ja Rekisteröidy -napit
  const loginBtn = document.getElementById("btn-login");
  const registerBtn = document.getElementById("btn-register");

  // Haetaan lomakkeen kentät
  //const username = document.getElementById("username");
  //const email = document.getElementById("email");
  //const password = document.getElementById("password");
  
  // Avaa modaali, kun Kirjaudu / Rekisteröidy -linkkiä painetaan
  openModalBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Estetään sivun uudelleenlataus
    modal.style.display = "flex"; // Näytetään modaali
    loginForm.style.display = "flex";
    registerForm.style.display = "none";
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
 
  /* //Tarkistaa, että kaikki kentät on täytetty ennen kirjautumista
  function validateForm() {
    if (!username.value || !email.value || !password.value) {
      alert("Täytä kaikki kentät!");
      return false;
    }
    return true;
  }  */

    // Vaihdetaan lomake rekisteröinnistä kirjautumiseen
  document.getElementById("btn-switch-login").addEventListener("click", function () {
    loginForm.style.display = "flex";
    registerForm.style.display = "none";
  });

  // Vaihdetaan lomake kirjautumisesta rekisteröintiin
  document.getElementById("btn-switch-register").addEventListener("click", function () {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
  });
  
  /* // Kun käyttäjä painaa Kirjaudu-nappia VANHA
  loginBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Estetään lomakkeen lähetys
    if (validateForm()) {
      alert("Kirjautuminen onnistui!");
      modal.style.display = "none"; // Suljetaan modaali onnistuneen kirjautumisen jälkeen
    }
  });
  
  // Kun käyttäjä painaa Rekisteröidy-nappia VANHA
  registerBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Estetään lomakkeen lähetys
    if (validateForm()) {
      alert("Rekisteröityminen onnistui!");
      modal.style.display = "none"; // Suljetaan modaali onnistuneen rekisteröitymisen jälkeen
    }
  }); */
  
  // Lähetetään tapahtumat auth.js:lle
loginBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Estetään lomakkeen lähetys
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Lähetetään tapahtuma loginUser-funktiolle auth.js:ssä
  const loginEvent = new CustomEvent('loginRequest', {
    detail: { username, password }
  });
  document.dispatchEvent(loginEvent); // Lähetetään tapahtuma
});

registerBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Estetään lomakkeen lähetys
  const username = document.getElementById('username-register').value;
  const password = document.getElementById('password-register').value;
  const email = document.getElementById('email-register').value;

  // Lisää konsoliloki, jotta tiedämme, että tapahtuma lähtee oikein
  console.log('Rekisteröinti tiedot:', username, password, email);

  // Lähetetään tapahtuma registerUser-funktiolle auth.js:ssä
  const registerEvent = new CustomEvent('registerRequest', {
    detail: { username, password, email }
  });
  document.dispatchEvent(registerEvent); // Lähetetään tapahtuma
});
  
  