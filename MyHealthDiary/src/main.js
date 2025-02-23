/*import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))*/

const lowBmi = `BMI alle 18,5.Painoindeksisi osoittaa, että olet alipainoinen.  Tämä voi tarkoittaa, että painosi on terveydelle mahdollisesti liian alhainen. Alipaino voi lisätä riskiä tietyille terveysongelmille, kuten heikentyneelle vastustuskyvylle, luuston haurastumiselle ja ravitsemuksellisille puutoksille. Suosittelemme keskustelua terveydenhuollon ammattilaisen kanssa tilanteen arvioimiseksi `;

const normalBmi = `BMI 18,5–24,9. Painoindeksisi on normaalin painon alueella. Tämä tarkoittaa, että painosi on pituuteesi nähden terveellisellä tasolla. Terveellinen paino voi auttaa vähentämään riskiä sairauksille, kuten sydänsairauksille, diabetekselle ja korkealle verenpaineelle. Jatka hyviä elämäntapoja ylläpitääksesi terveyttäsi!`;

const highBmi = ` BMI 25,0-29,. Painoindeksisi osoittaa, että olet ylipainoinen. Tämä tarkoittaa, että painosi on hieman korkeampi kuin pituuteesi nähden suositellaan. Ylipaino voi kasvattaa riskiä tietyille sairauksille, kuten tyypin 2 diabetekselle ja sydän- ja verisuonitaudeille. On hyvä idea kiinnittää huomiota terveellisiin ruokailutottumuksiin ja liikuntaan. Tarvittaessa voit keskustella terveydenhuollon ammattilaisen kanssa.`;

const veryHighBmi1 = ` BMI 30,0-34,9 Painoindeksisi osoittaa, että kuulut ensimmäiseen lihavuuden luokkaan. Tämä voi tarkoittaa kohonnutta riskiä monille terveysongelmille, kuten korkealle verenpaineelle, diabetekselle ja nivelongelmille. Elämäntapojen tarkastaminen ja tarvittaessa terveydenhuollon ammattilaisen tuki voivat auttaa painonhallinnassa ja terveyden parantamisessa.`;

const veryHighBmi2 = `BMI 35,0-39,9 Painoindeksisi osoittaa, että kuulut toiseen lihavuuden luokkaan. Tämä merkitsee korkeampaa riskiä terveysongelmille, kuten sydän- ja verisuonisairauksille, tyypin 2 diabetekselle ja uniapnealle. Suosittelemme vahvasti keskustelua terveydenhuollon ammattilaisen kanssa, jotta voit saada tukea ja ohjausta painonhallintaan ja yleiseen terveyteesi`;

const veryHighBmi3 = `BMI 40,0 tai enemmän Painoindeksisi osoittaa, että kuulut kolmanteen lihavuuden luokkaan. Tämä tarkoittaa huomattavasti kohonntta riskiä monille vakaville terveysongelmille, kuten sydän- ja verisuonisairauksille, tyypin 2 diabetekselle ja tuki- ja liikuntaelinten sairauksille. Terveydenhuollon ammattilaisen tuki on tässä vaiheessa erittäin suositeltavaa, jotta saat apua ja ohjeita painonhallintaan sekä terveyden parantamiseen.`;

const bmiForm = document.querySelector("form");
const weightInput = document.querySelector("#weight");
const heightInput = document.querySelector("#height");
const calculateButton = document.querySelector(".calculate");
const bmiScoreElement = document.querySelector(".bmi-score");
const analysisElement = document.querySelector(".analysis");
const lowBmiBack = document.querySelector(".bmi0-19");
const normalBmiBack = document.querySelector(".bmi19-25");
const highBmiBack = document.querySelector(".bmi25-30");
const veryHighBmi1Back = document.querySelector(".bmi30-35");
const veryHighBmi2Back = document.querySelector(".bmi35-40");
const veryHighBmi3Back = document.querySelector(".bmi40-");

//bmiForm.addEventListener('submit', analyysi);

calculateButton.addEventListener("click", (evt) => {
  console.log("calculate button clicked");
  evt.preventDefault();
  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);
  console.log(weight, height);

  calculateBMI(weight, height);
});

function calculateBMI(weight, height) {
  //height/100 muuttaa metreiksi. .toFixed(1) pyöristää yhden desimaalin tarkkuuteen

  const bmi = (weight / (height / 100) ** 2).toFixed(1);
  console.log(bmi);
  bmiScoreElement.innerText = bmi;

  //poistetaan taustaväri ennen uuden asettamista
  lowBmiBack.classList.remove("lowBmi");
  normalBmiBack.classList.remove("normalBmi");
  highBmiBack.classList.remove("highBmi");
  veryHighBmi1Back.classList.remove("veryHighBmi1");
  veryHighBmi2Back.classList.remove("veryHighBmi2");
  veryHighBmi3Back.classList.remove("veryHighBmi3");

  if (bmi < 18.5) {
    analysisElement.innerText = lowBmi;
    lowBmiBack.classList.add("lowBmi");
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    analysisElement.innerText = normalBmi;
    normalBmiBack.classList.add("normalBmi");
  } else if (bmi >= 25 && bmi <= 29.9) {
    analysisElement.innerText = highBmi;
    highBmiBack.classList.add("highBmi");
  } else if (bmi >= 30 && bmi <= 34.9) {
    analysisElement.innerText = veryHighBmi1;
    veryHighBmi1Back.classList.add("veryHighBmi1");
  } else if (bmi >= 35 && bmi <= 39.9) {
    analysisElement.innerText = veryHighBmi2;
    veryHighBmi2Back.classList.add("veryHighBmi2");
  } else {
    analysisElement.innerText = veryHighBmi3;
    veryHighBmi3Back.classList.add("veryHighBmi3");
  }
}

function toggleMenu() {
  let menu = document.querySelector(".nav-links");
  menu.classList.toggle("active");
}

