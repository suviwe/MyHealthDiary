# Ohjelmistotestaus - yksilötehtävät Suvi Westerberg
# Projekti - Terveyssovelluksen kehitys

## **Tehtävä 1**

Tehtävä 1 dokumentoi vaiheittaiset ohjeet Robot Frameworkin ja siihen liittyvien kirjastojen asennuksen Visual Studio code ympäristössä

### Avaa oma projektisi ja luo testaus kansiot tulevia testejä varten
1. Avaa Visual Studio Code. Avaa oma **frontend** projektisi (File > Open Folder). Lisää projektin juuren uusi kansio (new folder) `tests` ja sen alle kaksi kansiota `front` ja `back`.

Näitä kansioita käytetään myöhemmin testailuun.

### Testaa ensin että Python asennus on kunnossa.
1. Avaa terminaali, ja sieltä valitse Git Bash. 
2. Anna terminaalissa komento
```sh
python --version
```
terminaalissa tuloksen pitäisi näyttää esim. tältä:
```
Python 3.13.1
```

## Seuraavaksi luodaan virtuaaliympäristö
1. Seuraavaksi ajetaan komento
```sh
python -m venv .venv
```
Tämä luo projektiisi uuden kansion .venv

2. Seuraavaksi  aktivoidaan virtuaaliympäristö antamalla komento (jos windows)
 ```sh
  source .venv/Scripts/activate
  ```
Kun virtuaaliympäristö on aktivoitu, terminaalin prompt muuttuu ja työskentelet nyt virtuaaliympäristössä. Seuraavassa on kuva tästä ja seuraavista toiminnoista jotka teemme nyt.
### Virtuaaliympäristön aktivointi
![Virtuaaliympäristön aktivointi](docs/screenshots/first.png)

Ennenkuin jatketaan lisätään tämä .venv tiedosto gitignoreen. Jos projektissasi ei ole jo `.gitignore` tiedostoa, sellainen kannattaa luoda. Lisätään sinne .venv
Nyt virtuaaliympäristön tiedostot eivät kopioidu Github-kansioon.

## Seuraavaksi teemme kuvassakin näkyvät toiminnot
1. Ensin tarkistetaan, että Python-pakettien asentaja (pip) on päivitetty. Anna terminaalissa komento
```sh
 python -m pip install --upgrade pip
 ```
## Kun python ja pip asennettu ja päivitetty asenneteen robot Framework
1. Ajetaan komento
```sh
pip install robotframework
```
ja testaa myös, että asennus on onnistunut
```sh
robot --version
```

2. Asenna Browser libraryt
Varmista, että **Node.js** on asennettu:
```sh
node -v
```
Asenna Browser Library ja selainajurit:
```sh
pip install robotframework-browser
```
Alusta kirjaston toiminta
```sh
rfbrowser init
```

### Robotframeworkin asennuksen tarkistus 
![robot version tarkistus ja browser ](docs/screenshots/second.png)

![robot version tarkistus ja browser ](docs/screenshots/third.png)

![robot version tarkistus ja browser ](docs/screenshots/fourth.png)


## Jatketaan asennuksia.
### Request libraryn asennus
```sh
pip install robotframework-requests
```

### Cryptolibraryn asennus
```sh
pip install robotframework-cryptolibrary
```

### Robotidyn asennus
```sh
pip install robotframework-tidy
```

## Asennuslistan tarkistus
`pip freeze` on komento joka listaa kaikki nykyisessä Python ympäristössä asennetut paketit ja niiden versiot. Antamalla komennon
```sh
pip freeze
```
Tarkista että listastasi löytyy ainakin seuraavat (**HUOM! versionumerot voi olla eri**)

![moduulien tarkistus ](docs/screenshots/fifth.png)

### Voit myös ohjata pip freeze- komennon luottelon tiedostoon käyttämällä uudelleen ohjausta. Tämä luo `requirements.txt` tiedoston, joka sisältää kaikki nykyisessä ympäristössä asennetut paketit ja niiden versiot.
```sh
pip freeze > requirements.txt
```
Tämän tiedoston avulla voit asentaa samat paketit toisessa ympäristössä käyttämällä seuraavaa komentoa
```sh
pip install -r requirements.txt
```

Tässä asennettiin Robot Framework, jonka avulla voisaan tehdä ohjelmistojen automaattista testausta. Lisäksi asennettiin tarvittavat työkalut testausta varten. 
Ensimmäiseksi varmistettiin, että Python on asennettu, jonka jälkeen luotiin erillinen virtuaaliympäristö.
Lopuksi tarkistettiin, että kaikki asennukset onnistuivat ja tallennettiin tiedät `requirements.txt`-tiedostoon. 
Tässä asennuksessa siis tehtiin perusasetukset ohjelmistojen automaattista testausta varten, jotta voidaan testata sovelluksen toimivuutta eri tavoin.

## **Tehtävä 2**
Sovelletaan annettua esimerkkiä kirjautumis testistä omalle terveyspäiväkirja-sovellukselle.
Luodaan automaatiotesti, joka testaa omaan web-sovellukseeni sisäänkirjautumisen toimivuutta.

## Mitä testi tekee?

Testi tekee seuraavat toiminnot:
1. Avaa web-sovellukseni osoitteessa `http://localhost:5173/`
2. Klikkaa painiketta "Kirjaudu / Rekisteröidy", jolloin avautuu modaalilomake
3. Täyttää käyttäjätunnuksen ja salasanan automaattisesti
4. Klikkaa "Kirjaudu sisään" -painiketta
5. Tarkistaa, että kirjautuminen onnistuu (esimerkiksi "Omat Sivut" -linkki ilmestyy näkyviin)

## Testin rakenne

Testi on kirjoitettu `loginBrowser_demo.robot`-tiedostoon. Alla esimerkki testikoodista:

```robot
*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    loginKeywords.robot  

*** Test Cases ***
Test LogIn
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/
    Click With Options    css=a.openModal    delay=2 s

    Get Title      ==    HyteGym sivusto
    Type Text      id=username        ${Username}    delay=0.1 s 
    Type Secret    id=password        ${Password}    delay=0.1 s
    Click With Options    id=btn-login    delay=2 s
```
**Tämä testi ajetaan komennolla:** `robot tests/loginBrowser_demo.robot
`
## Tunnukset

Testissä käytetään seuraavia tunnuksia käyttäjän kirjautumistietojen tallentamiseen. Näihin syötetään sellaiset tunnukset, joilla kirjautuminen onnistuu web-sovellukseen. Nämä tiedot tallennetaan esimerkiksi `loginKeywords.robot` kansioon, jota `loginBrowser_demo.robot` kuuntelee koodia ajaessaan

```robot
*** Variables ***
${Username}     tähän toimiva käyttäjätunnus 
${Password}     tähän toimiva salasana
```

### Testikansiot ja tiedostot
- `tests/` on kansio, jossa kaikki testit sijaitsevat
- `loginBrowser_demo.robot` sisältää itse testin
- `loginKeywords.robot` voi sisältää tunnuksia ja avainsanoja

## Esimerkkikuva onnistuneesta testistä.
Kun testi onnistuu niin tulee **PASS**, alla kuva onnituneen testin tuloksesta:
![onnistunut testi](docs/screenshots/login_robot.png)

## Tulostiedostojen hallinta

Testiajon jälkeen Robot Framework ja Browser-kirjasto luovat useita loki- ja tulostiedostoja, kuten:

- `output.xml`
- `log.html`
- `report.html`
- `playwright-log-...`

Nämä tiedostot voivat muuten jäädä projektin juureen ja tehdä kansiosta epäsiistin.

**Ratkaisu:** voit ohjata kaikki nämä tiedostot omaan siistiin kansioon, esim. `outputs/`. Lisää `outputs` kansio projektin juureen. Jos teit testit ennen kansion luomista, voit raahata yllä olevat tiedostot sinne. Jatkossa testien tulokset menevät outpust-kansioon ja koodi pysyy siistimpänä. Käyttämällä seuraavaa komentoa, saat **`outputs`** kansion käyttöön:

```bash
robot --outputdir outputs tests/loginBrowser_demo.robot
```













