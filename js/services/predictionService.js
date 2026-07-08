import { db } from "../firebase.js";

import {
    collection,
    collectionGroup,
    doc,
    getDoc,
    getDocs,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

function playerId(player) {
    return player.toLowerCase();
}

export async function savePrediction(eventId, player, sprint, race) {

    await setDoc(
        doc(db, "predictions", eventId, "players", playerId(player)),
        {
            player,
            sprint,
            race,
            sprintPoints: 0,
            racePoints: 0,
            totalPoints: 0,
            updatedAt: new Date().toISOString()
        }
    );

}

export async function getPrediction(eventId, player) {

    const snapshot = await getDoc(
        doc(db, "predictions", eventId, "players", playerId(player))
    );

    if (!snapshot.exists())
        return null;

    return snapshot.data();

}

export async function getPredictions(eventId) {

    const snapshot = await getDocs(
        collection(db, "predictions", eventId, "players")
    );

    const predictions = [];

    snapshot.forEach(document => {

        predictions.push({
            id: document.id,
            ...document.data()
        });

    });

    predictions.sort((a, b) =>
        a.player.localeCompare(b.player, "de")
    );

    return predictions;

}

export async function getAllPredictions() {

    const snapshot = await getDocs(
        collectionGroup(db, "players")
    );

    const predictions = [];

    snapshot.forEach(document => {

        predictions.push(document.data());

    });

    return predictions;

}

export async function savePoints(
    eventId,
    player,
    sprintPoints,
    racePoints
) {

    await setDoc(
        doc(db, "predictions", eventId, "players", playerId(player)),
        {
            sprintPoints,
            racePoints,
            totalPoints: sprintPoints + racePoints
        },
        {
            merge: true
        }
    );

}