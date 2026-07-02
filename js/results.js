import { getCurrentEvent } from "./services/raceService.js";
import { getDriverNames } from "./services/driverService.js";
import { saveResult, getResult } from "./services/resultService.js";
import {
    getPredictions,
    savePoints
} from "./services/predictionService.js";
import { calculatePoints } from "./scoring.js";

const eventTitle = document.getElementById("resultEventTitle");
const sprintCard = document.getElementById("resultSprintCard");
const saveButton = document.getElementById("saveResult");

let currentEvent = null;

async function loadDrivers() {

    const drivers = await getDriverNames();

    document.querySelectorAll(".resultSprint, .resultRace").forEach(select => {

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

function values(selector) {

    return [...document.querySelectorAll(selector)].map(s => s.value);

}

function hasDuplicates(list) {

    const filtered = list.filter(v => v !== "");

    return new Set(filtered).size !== filtered.length;

}

async function loadExistingResult() {

    const result = await getResult(currentEvent.id);

    if (!result)
        return;

    if (currentEvent.hasSprint) {

        document.querySelectorAll(".resultSprint").forEach((select, index) => {

            select.value = result.sprint[index] ?? "";

        });

    }

    document.querySelectorAll(".resultRace").forEach((select, index) => {

        select.value = result.race[index] ?? "";

    });

}

async function calculateAllPoints(result) {

    const predictions = await getPredictions(currentEvent.id);

    for (const prediction of predictions) {

        let sprintPoints = 0;

        if (currentEvent.hasSprint) {

            sprintPoints = calculatePoints(
                prediction.sprint,
                result.sprint
            );

        }

        const racePoints = calculatePoints(
            prediction.race,
            result.race
        );

        await savePoints(
            currentEvent.id,
            prediction.player,
            sprintPoints,
            racePoints
        );

    }

}

saveButton.addEventListener("click", async () => {

    const sprint = values(".resultSprint");
    const race = values(".resultRace");

    if (currentEvent.hasSprint) {

        if (sprint.includes("")) {

            alert("Sprint-Ergebnis vollständig eingeben.");

            return;

        }

        if (hasDuplicates(sprint)) {

            alert("Sprint enthält doppelte Fahrer.");

            return;

        }

    }

    if (race.includes("")) {

        alert("GP-Ergebnis vollständig eingeben.");

        return;

    }

    if (hasDuplicates(race)) {

        alert("GP enthält doppelte Fahrer.");

        return;

    }

    const result = {

        sprint: currentEvent.hasSprint ? sprint : [],
        race: race

    };

    await saveResult(
        currentEvent.id,
        result.sprint,
        result.race
    );

    await calculateAllPoints(result);

    alert("Ergebnis gespeichert und Punkte berechnet.");

});

async function init() {

    currentEvent = await getCurrentEvent();

    if (!currentEvent) {

        eventTitle.textContent = "Kein aktives Event";

        saveButton.disabled = true;

        return;

    }

    eventTitle.textContent =
        `${currentEvent.name} / ${currentEvent.track}`;

    if (currentEvent.hasSprint) {

        sprintCard.classList.remove("hidden");

    } else {

        sprintCard.classList.add("hidden");

    }

    await loadDrivers();
    await loadExistingResult();

}

init();