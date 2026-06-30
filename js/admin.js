import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const input = document.getElementById("playerName");
const addButton = document.getElementById("addPlayer");
const list = document.getElementById("playerList");

async function loadPlayers() {

    list.innerHTML = "";

    const snapshot = await getDocs(collection(db, "players"));

    snapshot.forEach(player => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${player.data().name}
            <button class="deleteButton" data-id="${player.id}">
                Löschen
            </button>
        `;

        list.appendChild(li);

    });

    document.querySelectorAll(".deleteButton").forEach(button => {

        button.onclick = async () => {

            await deleteDoc(doc(db, "players", button.dataset.id));

            loadPlayers();

        };

    });

}

addButton.onclick = async () => {

    const name = input.value.trim();

    if (name === "") return;

    await addDoc(collection(db, "players"), {
        name
    });

    input.value = "";

    loadPlayers();

};

loadPlayers();