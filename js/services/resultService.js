import { db } from "../firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

export async function saveResult(eventId, sprint, race) {

    await setDoc(
        doc(db, "results", eventId),
        {
            sprint,
            race
        }
    );

}

export async function getResult(eventId) {

    const snapshot = await getDoc(
        doc(db, "results", eventId)
    );

    if (!snapshot.exists())
        return null;

    return snapshot.data();

}