import { db } from "../firebase.js";

import {
    collection,
    getDocs,
    getDoc,
    setDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const PLAYER_COLLECTION = "players";

export async function getPlayers() {

    const snapshot = await getDocs(collection(db, PLAYER_COLLECTION));

    const players = [];

    snapshot.forEach(document => {

        players.push({
            id: document.id,
            ...document.data()
        });

    });

    players.sort((a, b) =>
        a.displayName.localeCompare(b.displayName, "de")
    );

    return players;

}

export async function addPlayer(displayName) {

    const name = displayName.trim();

    if (name.length === 0)
        throw new Error("Name darf nicht leer sein.");

    const id = name.toLowerCase();

    const playerRef = doc(db, PLAYER_COLLECTION, id);

    const existing = await getDoc(playerRef);

    if (existing.exists())
        throw new Error("Teilnehmer existiert bereits.");

    await setDoc(playerRef, {
        displayName: name
    });

}

export async function removePlayer(id) {

    await deleteDoc(doc(db, PLAYER_COLLECTION, id));

}