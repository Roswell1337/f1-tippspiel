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

        li.querySelector("button").addEventListener("click", async () => {

            if (!confirm(`${player.displayName} wirklich löschen?`))
                return;

            await removePlayer(player.id);

            await loadPlayers();

        });

        list.appendChild(li);

    });

}

addButton.addEventListener("click", async () => {

    try {

        await addPlayer(input.value);

        input.value = "";

        await loadPlayers();

    } catch (error) {

        alert(error.message);

    }

});

loadPlayers();