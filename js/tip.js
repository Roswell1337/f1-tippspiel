import { getCurrentEvent } from "./services/raceService.js";
import { getPlayerNames } from "./services/playerService.js";
import { getDriverNames } from "./services/driverService.js";
import { savePrediction, getPrediction } from "./services/predictionService.js";

const eventTitle = document.getElementById("eventTitle");
const playerSelect = document.getElementById("playerSelect");
const sprintCard = document.getElementById("sprintCard");
const saveButton = document.getElementById("saveTip");

let currentEvent = null;

async function loadPlayers() {

    const players = await getPlayerNames();

    playerSelect.innerHTML = "";

    const first = document.createElement("option");
    first.value = "";
    first.textContent = "-- Teilnehmer auswählen --";
    playerSelect.appendChild(first);

    players.forEach(player => {

        const option = document.createElement("option");

        option.value = player;
        option.textContent = player;

        playerSelect.appendChild(option);

    });

}

async function loadDrivers() {

    const drivers = await getDriverNames();

    document.querySelectorAll(".driverSelect").forEach(select => {

        select.innerHTML = "";

        const first = document.createElement("option");
        first.value = "";
        first.textContent = "-- Fahrer auswählen --";

        select.appendChild(first);

        drivers.forEach(driver => {

            const option = document.createElement("option");

            option.value = driver;
            option.textContent = driver;

            select.appendChild(option);

        });

    });

}

function getValues(selector) {

    return [...document.querySelectorAll(selector)].map(s => s.value);

}

function hasDuplicates(array) {

    const values = array.filter(v => v !== "");

    return new Set(values).size !== values.length;

}

async function loadExistingPrediction() {

    if (!playerSelect.value)
        return;

    const prediction = await getPrediction(
        currentEvent.id,
        playerSelect.value
    );

    document.querySelectorAll(".driverSelect").forEach(select => {
        select.value = "";
    });

    if (!prediction)
        return;

    if (prediction.sprint) {

        document
            .querySelectorAll(".driverSelect.sprint")
            .forEach((select, index) => {

                select.value = prediction.sprint[index] ?? "";

            });

    }

    document
        .querySelectorAll(".driverSelect.race")
        .forEach((select, index) => {

            select.value = prediction.race[index] ?? "";

        });

}

playerSelect.addEventListener("change", loadExistingPrediction);

saveButton.addEventListener("click", async () => {

    const now = new Date();

    if (now >= new Date(currentEvent.deadline)) {

        alert("Die Tippabgabe ist bereits beendet.");

        return;

    }

    if (!playerSelect.value) {

        alert("Bitte Teilnehmer auswählen.");

        return;

    }

    const sprint = getValues(".driverSelect.sprint");
    const race = getValues(".driverSelect.race");

    if (currentEvent.hasSprint) {

        if (sprint.includes("")) {

            alert("Sprint-Tipp vollständig ausfüllen.");

            return;

        }

        if (hasDuplicates(sprint)) {

            alert("Sprint: Fahrer darf nur einmal gewählt werden.");

            return;

        }

    }

    if (race.includes("")) {

        alert("GP-Tipp vollständig ausfüllen.");

        return;

    }

    if (hasDuplicates(race)) {

        alert("GP: Fahrer darf nur einmal gewählt werden.");

        return;

    }

    await savePrediction(
        currentEvent.id,
        playerSelect.value,
        currentEvent.hasSprint ? sprint : [],
        race
    );

    alert("Tipp gespeichert.");

});

async function init() {

    currentEvent = await getCurrentEvent();

    if (!currentEvent) {

        alert("Kein aktives Event.");

        return;

    }

    eventTitle.textContent =
        `${currentEvent.name} / ${currentEvent.track}`;

    if (new Date() >= new Date(currentEvent.deadline)) {

    saveButton.disabled = true;
    saveButton.textContent = "Tippabgabe beendet";

    }

    if (currentEvent.hasSprint) {

        sprintCard.classList.remove("hidden");

    } else {

        sprintCard.classList.add("hidden");

    }

    await loadPlayers();
    await loadDrivers();

}

init();