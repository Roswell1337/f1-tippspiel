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

    await setDoc(doc(db, EVENT_COLLECTION, race.id), {
        id: race.id,
        season: 2026,
        name: race.name,
        track: race.track,
        hasSprint: race.hasSprint,
        deadline,
        status: "open"
    });

}

export async function getEvents() {

    const snapshot = await getDocs(collection(db, EVENT_COLLECTION));

    const events = [];

    snapshot.forEach(doc => {

        events.push(doc.data());

    });

    events.sort((a, b) => a.deadline.localeCompare(b.deadline));

    return events;

}

export async function setCurrentEvent(eventId) {

    await setDoc(doc(db, "settings", "current"), {
        currentEvent: eventId
    });

}

export async function getCurrentEventId() {

    const current = await getDoc(doc(db, "settings", "current"));

    if (!current.exists())
        return null;

    return current.data().currentEvent;

}

export async function getCurrentEvent() {

    const current = await getDoc(doc(db, "settings", "current"));

    if (!current.exists())
        return null;

    const id = current.data().currentEvent;

    const event = await getDoc(doc(db, EVENT_COLLECTION, id));

    if (!event.exists())
        return null;

    return event.data();

}