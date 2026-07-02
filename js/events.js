import {
    getRaceList,
    getEvents,
    saveEvent,
    setCurrentEvent,
    getCurrentEventId
} from "./services/raceService.js";

const raceSelect = document.getElementById("raceSelect");
const deadlineInput = document.getElementById("deadline");
const saveButton = document.getElementById("saveRace");
const eventList = document.getElementById("eventList");

let races = [];

async function loadRaceList() {

    races = await getRaceList();

    raceSelect.innerHTML = "";

    races.forEach(race => {

        const option = document.createElement("option");

        option.value = race.id;
        option.textContent =
            `${race.name} / ${race.track}${race.hasSprint ? " (Sprint)" : ""}`;

        raceSelect.appendChild(option);

    });

}

async function loadEvents() {

    const currentEvent = await getCurrentEventId();
    const events = await getEvents();

    eventList.innerHTML = "";

    events.forEach(event => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${event.name} / ${event.track}</strong><br>
                <small>Deadline: ${event.deadline.replace("T"," ")}</small>
                ${event.hasSprint ? "<br><small>🏎 Sprint-Wochenende</small>" : ""}
            </div>

            <button class="currentButton">
                ${currentEvent === event.id ? "Aktiv" : "Aktiv setzen"}
            </button>
        `;

        li.querySelector(".currentButton").addEventListener("click", async () => {

            await setCurrentEvent(event.id);

            await loadEvents();

        });

        eventList.appendChild(li);

    });

}

saveButton.addEventListener("click", async () => {

    if (!deadlineInput.value) {
        alert("Bitte eine Deadline auswählen.");
        return;
    }

    const race = races.find(r => r.id === raceSelect.value);

    await saveEvent(race, deadlineInput.value);

    deadlineInput.value = "";

    await loadEvents();

});

await loadRaceList();
await loadEvents();