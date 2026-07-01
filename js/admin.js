import {
    getDrivers,
    addDriver,
    removeDriver
} from "./services/driverService.js";

import {
    getRaceList,
    saveEvent,
    getEvents
} from "./services/raceService.js";

import {
    getPlayers,
    addPlayer,
    removePlayer
} from "./services/playerService.js";

const input = document.getElementById("playerName");
const addButton = document.getElementById("addPlayer");
const list = document.getElementById("playerList");

async function loadPlayers() {

    const players = await getPlayers();

    list.innerHTML = "";

    players.forEach(player => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${player.displayName}</span>
            <button class="deleteButton">Löschen</button>
        `;

        li.querySelector("button").onclick = async () => {

            if (!confirm(`${player.displayName} wirklich löschen?`))
                return;

            await removePlayer(player.id);

            loadPlayers();

        };

        list.appendChild(li);

    });

}

addButton.onclick = async () => {

    try {

        await addPlayer(input.value);

        input.value = "";

        loadPlayers();

    }

    catch (error) {

        alert(error.message);

    }

};

loadPlayers();

const raceSelect = document.getElementById("raceSelect");

async function loadRaceList() {

    const races = await getRaceList();

    raceSelect.innerHTML = "";

    races.forEach(race => {

        const option = document.createElement("option");

        option.value = race.id;
        option.textContent =
            `${race.name} / ${race.track}${race.hasSprint ? " (Sprint)" : ""}`;

        raceSelect.appendChild(option);

    });

}

loadRaceList();

const pages = {

    players: document.getElementById("playersPage"),
    drivers: document.getElementById("driversPage"),
    events: document.getElementById("eventsPage"),
    results: document.getElementById("resultsPage")

};

document.querySelectorAll(".menuButton").forEach(button => {

    button.onclick = () => {

        document.querySelectorAll(".page").forEach(page => {

            page.classList.add("hidden");

        });

        document.querySelectorAll(".menuButton").forEach(btn => {

            btn.classList.remove("active");

        });

        pages[button.dataset.page].classList.remove("hidden");

        button.classList.add("active");

    };

});

const driverInput = document.getElementById("driverName");
const driverButton = document.getElementById("addDriver");
const driverList = document.getElementById("driverList");

async function loadDrivers() {

    const drivers = await getDrivers();

    driverList.innerHTML = "";

    drivers.forEach(driver => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${driver.name}</span>
            <button class="deleteButton">Löschen</button>
        `;

        li.querySelector("button").onclick = async () => {

            if (!confirm(`${driver.name} wirklich löschen?`))
                return;

            await removeDriver(driver.id);

            loadDrivers();

        };

        driverList.appendChild(li);

    });

}

driverButton.onclick = async () => {

    try {

        await addDriver(driverInput.value);

        driverInput.value = "";

        loadDrivers();

    }

    catch (error) {

        alert(error.message);

    }

};

loadDrivers();