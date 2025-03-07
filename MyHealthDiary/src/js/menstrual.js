import { fetchData } from "./fetch.js";


const saveMenstrualEntry = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    

    const cycleData = {
        start_date: document.querySelector("#start-date").value,
        symptoms: document.querySelector("#symptoms").value.trim(),
        notes: document.querySelector("#notes").value.trim()
    };


    // Lisätään end_date vain, jos käyttäjä on syöttänyt sen
    const endDate = document.querySelector("#end-date").value;
    if (endDate) {
        cycleData.end_date = endDate;
    }

    try {
        const response = await fetch("http://localhost:3000/api/cycle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(cycleData)
        });

        if (!response.ok) throw new Error("Virhe merkinnän tallennuksessa.");

        alert("Merkintä tallennettu!");
        menstrualForm.reset();
    } catch (error) {
        console.error("Tallennusvirhe:", error);
    }
};

//Lisää event listener lomakkeelle
const menstrualForm = document.querySelector("#menstrual-form");
if (menstrualForm) {
    menstrualForm.addEventListener("submit", saveMenstrualEntry);
}


//Hae kaikki merkinnät


// Funktio: Hakee käyttäjän kaikki kuukautiskierron merkinnät
const fetchMenstrualCycles = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Kirjaudu sisään hakeaksesi kuukautiskierron merkinnät.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/cycle", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // Tarkistetaan, löytyykö merkintöjä
        if (response.status === 404) {
            alert("Sinulla ei ole vielä kuukautiskierron merkintöjä. Lisää uusi merkintä!");
            return;
        }

        if (!response.ok) {
            throw new Error("Virhe haettaessa kuukautiskierron merkintöjä.");
        }

        const cycles = await response.json();

        // Jos listassa ei ole merkintöjä
        if (cycles.length === 0) {
            alert("Sinulla ei ole vielä kuukautiskierron merkintöjä. Lisää uusi merkintä!");
            return;
        }

        displayMenstrualEntries(cycles); // Näytetään merkinnät käyttäjälle
    } catch (error) {
        console.error("Virhe merkintöjen haussa:", error);
        alert("Tapahtui virhe haettaessa kuukautiskierron merkintöjä.");
    }
};


document.getElementById("fetch-all-cycles").addEventListener("click", fetchMenstrualCycles);


const displayMenstrualEntries = (entries) => {
    const entryContainer = document.getElementById('stats-output');
    entryContainer.innerHTML = ''; // Tyhjennetään vanhat merkinnät

    if (entries.length === 0) {
        entryContainer.innerHTML = "<p>Ei vielä merkintöjä.</p>";
        return;
    }

    entries.forEach(entry => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        // Lisätään kuukautisten kesto, mutta vain jos se on saatavilla
        //const cycleLengthText = entry.cycle_length ? `${entry.cycle_length} päivää` : "Ei saatavilla";
        // Lisätään kuukautisten kesto, mutta vain jos se on saatavilla
         // Näytetään kuukautisten kesto, mutta vain jos se on saatavilla
        const menstruationLengthText = entry.cycle_length ? `${entry.cycle_length} päivää` : "Ei saatavilla";

        cardContent.innerHTML = `
            <p><strong>Alkamispäivä:</strong> ${entry.start_date ? entry.start_date.split("T")[0] : "Ei saatavilla"}</p>
            <p><strong>Päättymispäivä:</strong> ${entry.end_date ? entry.end_date.split("T")[0] : "Käynnissä"}</p>
            <p><strong>Kuukautisten kesto:</strong> ${menstruationLengthText}</p>
            <p><strong>Oireet:</strong> ${entry.symptoms || "Ei oireita"}</p>
            <p><strong>Muistiinpanot:</strong> ${entry.notes || "Ei muistiinpanoja"}</p>
        `;

        // Luo Muokkaa-nappi
        const editButton = document.createElement("button");
        editButton.textContent = "Muokkaa";
        editButton.classList.add("edit-entry");
        editButton.addEventListener("click", () => editEntry(entry));

        // Lisää napit korttiin
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("card-buttons");
        buttonsDiv.appendChild(editButton);

        card.appendChild(cardContent);
        card.appendChild(buttonsDiv);
        entryContainer.appendChild(card);
    });
};
const editEntry = (entry) => {
    document.querySelector("#start-date").value = entry.start_date ? entry.start_date.split("T")[0] : "";
    document.querySelector("#end-date").value = entry.end_date ? entry.end_date.split("T")[0] : "";
    document.querySelector("#symptoms").value = entry.symptoms || "";
    document.querySelector("#notes").value = entry.notes || "";

    // Tallennetaan ID piilotettuun kenttään
    document.querySelector("#menstrual-form").dataset.id = entry.cycle_id;
    document.querySelector("#menstrual-form").classList.add("editing-mode");
    document.querySelector("#menstrual-form").scrollIntoView({ behavior: "smooth", block: "start" });

    // Piilota Tallenna-nappi ja näytä Päivitä-nappi
    document.querySelector("#save-cycle").style.display = "none";
    document.querySelector("#update-cycle").style.display = "block";
};

const updateEntry = async () => {
    const entryId = document.querySelector("#menstrual-form").dataset.id;
    console.log("Päivitetään merkintää, entryId:", entryId);

    if (!entryId) {
        console.error("Päivitys epäonnistui: entryId puuttuu.");
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Kirjaudu sisään muokataksesi merkintää.");
        return;
    }

    // Luodaan objekti vain muokatuille kentille
    const updatedEntry = {};

    const startDate = document.querySelector("#start-date").value;
    if (startDate) updatedEntry.start_date = startDate;

    const endDate = document.querySelector("#end-date").value;
    if (endDate) updatedEntry.end_date = endDate;

    const symptoms = document.querySelector("#symptoms").value;
    if (symptoms) updatedEntry.symptoms = symptoms;

    const notes = document.querySelector("#notes").value;
    if (notes) updatedEntry.notes = notes;

    const url = `http://localhost:3000/api/cycle/${entryId}`;
    const options = {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedEntry)
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Virhe päivittäessä merkintää.");

        alert("Merkintä päivitetty!");
        document.querySelector("#menstrual-form").reset();
        document.querySelector("#menstrual-form").classList.remove("editing-mode");

        // Palautetaan napit normaaliksi
        document.querySelector("#save-cycle").style.display = "block";  // Näytetään taas Tallenna-nappi
        document.querySelector("#update-cycle").style.display = "none";  // Piilotetaan Päivitä-nappi

        fetchMenstrualCycles(); // Haetaan ja päivitetään merkinnät uudelleen
    } catch (error) {
        console.error("Päivitysvirhe:", error);
    }
};
// Lisää event listener Päivitä-napille 
document.querySelector("#update-cycle").addEventListener("click", updateEntry);




//Hae keskimääräinen kuukautisten kesto
document.getElementById("fetch-average-menstruation").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Kirjaudu sisään hakeaksesi keskimääräisen kuukautisten keston.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/cycle/stats/average-menstruation-length", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Virhe haettaessa keskimääräistä kuukautisten kestoa.");

        const data = await response.json();
        document.getElementById("stats-menstruation-output").innerHTML = `<h3>Keskimääräinen kuukautisten kesto:</h3><p>${data.avg_menstruation_length} päivää</p>`;

    } catch (error) {
        console.error("Virhe:", error);
    }
});

// Hae keskimääräinen kierron pituus
document.getElementById("fetch-average-cycle").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Kirjaudu sisään hakeaksesi keskimääräisen kierron.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/cycle/stats/average-cycle-length", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Virhe haettaessa kuukautisten keskimääräistä kierron pituutta.");

        const data = await response.json();
        document.getElementById("stats-cycle-output").innerHTML = `<h3>Keskimääräinen kierron pituus:</h3><p>${data.avg_cycle_length} päivää</p>`;

    } catch (error) {
        console.error("Virhe:", error);
    }
});

/* // Hae keskimääräinen kierron pituus
document.getElementById("fetch-average-cycle").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Kirjaudu sisään hakeaksesi keskimääräisen kierron pituuden.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/cycle/stats/average-cycle-length", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Virhe haettaessa keskimääräistä kierron pituutta.");

        const data = await response.json();
        document.getElementById("stats-cycle-output").innerHTML = `<h3>Keskimääräinen kierron pituus:</h3><p>${data.avg_cycle_length} päivää</p>`;

    } catch (error) {
        console.error("Virhe:", error);
    }
});


 */
