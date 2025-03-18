# Ohjelmistotestaus - yksilötehtävät Suvi Westerberg
# Projekti - Terveyssovelluksen kehitys

## Tehtävä 1

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








