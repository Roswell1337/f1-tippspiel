import { db } from "../firebase.js";

import {
    collection,
    getDocs,
    getDoc,
    setDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const EVENT_COLLECTION = "events";

export async function getRaceList() {

    const response = await fetch("./data/races2026.json");

    return await response.json();

}

export async function saveEvent(race, deadline) {

    const eventRef = doc(db, EVENT_COLLECTION, race.id);

    await setDoc(eventRef, {
        id: race.id,
        season: 2026,
        name: race.name,
        track: race.track,
        hasSprint: race.hasSprint,
        deadline: deadline,
        status: "open"
    });

}

export async function getEvents() {

    const snapshot = await getDocs(collection(db, EVENT_COLLECTION));

    const events = [];

    snapshot.forEach(document => {

        events.push(document.data());

    });

    return events;

}