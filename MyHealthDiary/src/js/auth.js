
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

    // Hae data
    const response = await fetchData(url, options);

    if (response.error) {
        console.error('Error in registration', response.error);
        return;
    }

    console.log(response.message, 'success');
    alert('rekisteröinti onnistui')
    location.href = './main.html';
    //location.reload();
    //console.log(response.message);
    //location.href = './logIn.html';  // Ohjataan käyttäjä eteenpäin dashboardille
    

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
    return;
    }

    console.log(response.message);
    localStorage.setItem('token', response.token);
    alert('Kirjautuminen onnistui!');
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
 




