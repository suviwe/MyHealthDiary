
import {fetchData} from './fetch.js';




//Rekisteröintipyyntö
document.addEventListener('registerRequest', async function(event) {
    const { username, password, email } = event.detail;

    // Lisää konsoliloki, jotta tiedämme, että tapahtuma tuli oikein
    console.log('Rekisteröinti tiedot auth.js:ssä:', username, password, email);

    // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
    const bodyData = {
    username: username,
    password: password,
    email: email,
    };

    // Endpoint
    const url = 'http://localhost:3000/api/users';

    // Options
    const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    };
    console.log(options);

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (response.ok) {
            console.log('Rekisteröinti onnistui:', data);

            
            localStorage.removeItem("token");
            sessionStorage.clear();

            alert("Rekisteröinti onnistui! Kirjaudu nyt sisään.");
            
            //Avaa kirjautumisikkuna automaattisesti
            document.getElementById("loginModal").style.display = "flex";
            document.getElementById("loginForm").style.display = "flex";
            document.getElementById("registerForm").style.display = "none";

        } else {
            console.error('Rekisteröinti epäonnistui:', data.error);
            alert('Rekisteröinti epäonnistui: ' + data.error);
        }
    } catch (error) {
        console.error('Virhe rekisteröitymisessä:', error);
        alert('Virhe rekisteröitymisessä.');
    }
});



// Kirjautumispyyntö
document.addEventListener('loginRequest', async function(event) {
    const { username, password } = event.detail;

    // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
    const bodyData = {
    username: username,
    password: password,

    };

    // Endpoint
    const url = 'http://localhost:3000/api/users/login';

    // Options
    const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    };
    console.log(options);

    // Hae data
    const response = await fetchData(url, options);
 
    

    if (response.error) {
    console.error('Error in login:', response.error);
    alert("virhe kirjautumisessa, tarkista käyttäjätunnus ja salasana. Uusi käyttäjä, olethan muistanut rekisteröityä");
    return;
    }

    console.log(response.message);
    localStorage.setItem('token', response.token);

    console.log("Tallennettu token:", localStorage.getItem('token')); // Tarkistaa, tallentuiko token

    //alert('Kirjautuminen onnistui!');
    location.href = './main.html';  // Ohjataan käyttäjä eteenpäin dashboardille
  });



    const checkUser = async (event) => {
    event.preventDefault();

    // Endpoint
    const url = 'http://localhost:3000/api/users/me';

    //kutsun headers tiedot johon liitetään tokeni
    let headers = {};

    // nyt haetaan token localstoresta
    const token = localStorage.getItem('token');

    // muodostetaan token oikeaan muotoon 
    headers = {
    Authorization: `Bearer ${token}`
    }

    // Options
    const options = {
    headers: headers,
    };

    console.log(options);

    // Hae data
    const response = await fetchData(url, options);

    if (response.error) {
    console.error('Error getting data:', response.error);
    return;
    }

    if (response.message) {
    console.log(response.message, 'success');

    }

    console.log(response);

    };
 
    const token = localStorage.getItem("token");
    const profileLink = document.getElementById("profile-link");
    const logoutBtn = document.getElementById("logout-btn");
    
    if (token) {
        profileLink.style.display = "block"; // Näytetään "Omat Sivut" linkki kirjautuneille
        logoutBtn.style.display = "block";   // Näytetään "Kirjaudu ulos" linkki
    }
    
    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("token");  // Poistetaan token
        sessionStorage.clear();            // Varmistetaan istunnon tyhjennys
        location.href = "index.html";      // Ohjataan käyttäjä etusivulle
    });
       

