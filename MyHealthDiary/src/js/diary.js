  
import { fetchData } from "./fetch.js";


const diaryForm = document.querySelector("#diary-form");

if (diaryForm) {
    diaryForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Estetään sivun uudelleenlataus

        const diaryEntryData = {};

        // Tarkistetaan pakolliset kentät
        const entryDateInput = document.querySelector("#entry-date").value;
        if (entryDateInput) {
            diaryEntryData.entry_date = entryDateInput;
        } else {
            alert("Päivämäärä on pakollinen!");
            return;
        }

        // Haetaan mieliala (mood), joka on vapaaehtoinen
        const moodInput = document.querySelector("#mood").value.trim();
        if (moodInput) {
            diaryEntryData.mood = moodInput;
        } 

        // Haetaan mielialan voimakkuus (hymiö), joka on PAKOLLINEN
        const moodIntensityInput = document.querySelector('input[name="mood_intensity"]:checked');
        if (moodIntensityInput) {
            diaryEntryData.mood_intensity = parseInt(moodIntensityInput.value);
        } else {
            alert("Valitse mielialan intensiteetti!");
            return;
        }

        // Haetaan paino, joka on vapaaehtoinen
        const weightInput = document.querySelector("#weight").value;
        if (weightInput) {
            diaryEntryData.weight = parseFloat(weightInput);
        } 

        // Haetaan unen määrä, joka on vapaaehtoinen
        const sleepHoursInput = document.querySelector("#sleep-hours").value;
        if (sleepHoursInput) {
            diaryEntryData.sleep_hours = parseFloat(sleepHoursInput);
        } 

        // Haetaan veden juonti, joka on vapaaehtoinen
        const waterIntakeInput = document.querySelector("#water-intake").value;
        if (waterIntakeInput) {
            diaryEntryData.water_intake = parseInt(waterIntakeInput);
        } 

        // Haetaan askeleet, jotka ovat vapaaehtoiset
        const stepsInput = document.querySelector("#steps").value;
        if (stepsInput) {
            diaryEntryData.steps = parseInt(stepsInput);
        } 

        // Haetaan muistiinpanot, jotka ovat vapaaehtoiset
        const notesInput = document.querySelector("#notes").value.trim();
        if (notesInput) {
            diaryEntryData.notes = notesInput;
        } 

        console.log("Lähetetään tapahtuma:", diaryEntryData);
        console.log("Lähetettävä data:", JSON.stringify(diaryEntryData, null, 2));

        // Lähetetään tapahtuma, joka aktivoi tallennuksen
        const diaryEntryEvent = new CustomEvent("diaryEntryRequest", {
            detail: diaryEntryData
        });

        document.dispatchEvent(diaryEntryEvent);
    });
}


// Kuunnellaan tapahtumaa, kun päiväkirjamerkintä lähetetään
document.addEventListener("diaryEntryRequest", async function (event) {
    const { entry_date, mood, mood_intensity, weight, sleep_hours, water_intake, steps, notes } = event.detail;

    console.log("Päiväkirjamerkinnän tiedot:", event.detail); // Testilogi

    // Haetaan token localStoragesta
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Kirjaudu sisään tallentaaksesi merkintöjä.");
        return;
    }

    // Endpoint
    const url = "http://localhost:3000/api/diary";

    // Options
    const options = {
        body: JSON.stringify({
            entry_date,
            mood,
            mood_intensity,
            weight,
            sleep_hours,
            water_intake,
            steps,
            notes,
        }),
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    console.log("Lähetetään merkintä:", options);


    // Hae data
    const response = await fetch(url, options);

    if (response.error) {
        console.error("Error in diary entry:", response.error);
        return;
    }

    console.log(response.message, "success");
    

    // Tyhjennetään lomake
        document.querySelector("#diary-form").reset();
});



//koodi merkintöjen hakemiselle

const getEntries = async () => {
    console.log('Haetaan päiväkirjamerkinnät...');

    // Haetaan alue johon kortit lisätään
    const diaryContainer = document.getElementById('diary');
    console.log(diaryContainer);

    // Haetaan token, koska reitti voi olla suojattu
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Kirjaudu sisään hakeaksesi päiväkirjamerkinnät.");
        return;
    }

    // Haetaan päiväkirjamerkinnät backendista
    const url = 'http://localhost:3000/api/diary';
    const options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Virhe haettaessa päiväkirjamerkintöjä");

        const entries = await response.json();
        console.log("Haetut merkinnät:", entries);

        // Näytetään merkinnät korteissa
        displayEntries(entries);
    } catch (error) {
        console.error("Virhe merkintöjen haussa:", error);
    }
};

// Funktio merkintöjen näyttämiseen korteissa
const displayEntries = (entries) => {
    const diaryContainer = document.getElementById('diary');
    diaryContainer.innerHTML = ''; // Tyhjennetään vanhat merkinnät

    if (entries.length === 0) {
        diaryContainer.innerHTML = "<p>Ei vielä merkintöjä.</p>";
        return;
    }

    entries.forEach(entry => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardImg = document.createElement("div");
        cardImg.classList.add("card-img");
        const img = document.createElement("img");
        img.src = 'src/assets/notes.jpg';
        img.alt = 'Diary Image';
        cardImg.appendChild(img);

        const cardDiary = document.createElement("div");
        cardDiary.classList.add("card-diary");
        cardDiary.innerHTML = `
            <p><strong>Päivämäärä:</strong> ${entry.entry_date}</p>
            <p><strong>Mieliala:</strong> ${entry.mood}</p>
            <p><strong>Mielialan-intensiteetti:</strong> ${entry.mood_intensity}</p>
            <p><strong>Paino:</strong> ${entry.weight} kg</p>
            <p><strong>Uni:</strong> ${entry.sleep_hours} tuntia</p>
            <p><strong>Vedenjuonti:</strong> ${entry.water_intake}</p>
            <p><strong>Askeleet:</strong> ${entry.steps}</p>
            <p><strong>Muistiinpanot:</strong> ${entry.notes}</p>
        `;
        
        // Luo napit
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("card-buttons");

        // Muokkaa-nappi
        const editButton = document.createElement("button");
        editButton.textContent = "Muokkaa";
        editButton.classList.add("edit-entry");
        editButton.addEventListener("click", () => editEntry(entry));

        // Poista-nappi
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Poista";
        deleteButton.classList.add("delete-entry");
        deleteButton.addEventListener("click", () => deleteEntry(entry.entry_id));

        // Lisää napit korttiin
        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);
        cardDiary.appendChild(buttonsDiv);
        card.appendChild(cardImg);
        card.appendChild(cardDiary);
        diaryContainer.appendChild(card);
    });
};

// Lisää eventListener nappiin, joka hakee merkinnät
document.querySelector(".fetch-entries").addEventListener("click", getEntries);

const deleteEntry = async (entryId) => {
    if (!confirm("Haluatko varmasti poistaa merkinnän?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Kirjaudu sisään poistaaksesi merkinnän.");
        return;
    }

    const url = `http://localhost:3000/api/diary/${entryId}`;
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Virhe poistettaessa merkintää.");

        alert("Merkintä poistettu!");
        getEntries(); // Päivitä kortit
    } catch (error) {
        console.error("Poistovirhe:", error);
    }
};

const editEntry = (entry) => {
    // Esitäytä lomake merkinnän olremassa olevilla tiedoilla
    document.querySelector("#entry-date").value = entry.entry_date.split("T")[0]; 
    document.querySelector("#mood").value = entry.mood;
    document.querySelector(`input[name="mood_intensity"][value="${entry.mood_intensity}"]`).checked = true;
    document.querySelector("#weight").value = entry.weight;
    document.querySelector("#sleep-hours").value = entry.sleep_hours;
    document.querySelector("#water-intake").value = entry.water_intake;
    document.querySelector("#steps").value = entry.steps;
    document.querySelector("#notes").value = entry.notes;

    // Tallennetaan ID piilotettuun kenttään
    document.querySelector("#diary-form").dataset.id = entry.entry_id;
    document.querySelector("#diary-form").classList.add("editing-mode");
    document.querySelector("#diary-form").scrollIntoView({ behavior: "smooth", block: "start" });

    // Vaihdetaan lomakkeen toiminnallisuus "Muokkaa"-tilaan
    document.querySelector("#save-entry").textContent = "Päivitä merkintä";
    document.querySelector("#save-entry").onclick = () => updateEntry(entry.entry_Id);
};


const updateEntry = async (entryId) => {
    console.log("päivitetään merkintää")
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Kirjaudu sisään muokataksesi merkintää.");
        return;
    }

    
    const updatedEntry = {
        entry_date: document.querySelector("#entry-date").value,
        mood: document.querySelector("#mood").value,
        mood_intensity: parseInt(document.querySelector('input[name="mood_intensity"]:checked').value),
        weight: parseFloat(document.querySelector("#weight").value),
        sleep_hours: parseFloat(document.querySelector("#sleep-hours").value),
        water_intake: parseInt(document.querySelector("#water-intake").value),
        steps: parseInt(document.querySelector("#steps").value),
        notes: document.querySelector("#notes").value
    };

    const url = `http://localhost:3000/api/diary/${entryId}`;
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

        const data = await response.json();
        console.log("Päivitys onnistui:", data);

        // 🔹 **Päivitetään UI ilman hakua**
        const entryCard = document.querySelector(`[data-id="${entryId}"]`);
        if (entryCard) {
            entryCard.innerHTML = `
                <p><strong>Päivämäärä:</strong> ${updatedEntryData.entry_date}</p>
                <p><strong>Mieliala:</strong> ${updatedEntryData.mood}</p>
                <p><strong>Mielialan-intensiteetti:</strong> ${updatedEntryData.mood_intensity}</p>
                <p><strong>Paino:</strong> ${updatedEntryData.weight} kg</p>
                <p><strong>Uni:</strong> ${updatedEntryData.sleep_hours} tuntia</p>
                <p><strong>Vedenjuonti:</strong> ${updatedEntryData.water_intake}</p>
                <p><strong>Askeleet:</strong> ${updatedEntryData.steps}</p>
                <p><strong>Muistiinpanot:</strong> ${updatedEntryData.notes}</p>
                <button class="edit-btn" onclick="editEntry(${entryId})">Muokkaa</button>
                <button class="delete-btn" onclick="deleteEntry(${entryId})">Poista</button>
            `;
        }

        // 🔹 **Poistetaan muokkaustila**
        diaryForm.classList.remove("editing-mode");
        document.querySelector("#save-entry").textContent = "Tallenna merkintä";
        diaryForm.reset();

    } catch (error) {
        console.error("Päivitysvirhe:", error);
    }
    /*try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Virhe päivitettäessä merkintää.");

        alert("Merkintä päivitetty!");
        document.querySelector("#save-entry").textContent = "Tallenna merkintä";
        document.querySelector("#save-entry").onclick = saveEntry;
        getEntries(); // Päivitä kortit
    } catch (error) {
        console.error("Päivitysvirhe:", error);
    }*/
};

/*tilastot */
const getStats = async () => {
    console.log("Haetaan tilastot...");

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Kirjaudu sisään nähdäksesi tilastot.");
        return;
    }

    try {
        // Haetaan unikeskiarvo
        const sleepResponse = await fetch("http://localhost:3000/api/diary/stats/sleep", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const stepsResponse = await fetch("http://localhost:3000/api/diary/stats/steps", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!sleepResponse.ok || !stepsResponse.ok) throw new Error("Virhe haettaessa tilastoja.");

        const sleepData = await sleepResponse.json();
        const stepsData = await stepsResponse.json();

        console.log("Saadut tilastot:", sleepData, stepsData);

        // Päivitetään UI
        document.getElementById("sleep-stat").textContent = sleepData.message;
        document.getElementById("steps-stat").textContent = stepsData.message;

    } catch (error) {
        console.error("Tilastovirhe:", error);
        alert("Virhe haettaessa tilastoja.");
    }
};

// Lisää eventListener nappiin, joka hakee tilastot
document.getElementById("fetch-stats").addEventListener("click", getStats);


export { getEntries };



