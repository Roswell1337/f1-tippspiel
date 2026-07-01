import { db } from "../firebase.js";

import {
    collection,
    getDocs,
    getDoc,
    setDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const DRIVER_COLLECTION = "drivers";

export async function getDrivers() {

    const snapshot = await getDocs(collection(db, DRIVER_COLLECTION));

    const drivers = [];

    snapshot.forEach(document => {

        drivers.push({
            id: document.id,
            ...document.data()
        });

    });

    drivers.sort((a, b) =>
        a.name.localeCompare(b.name, "de")
    );

    return drivers;

}

export async function addDriver(name) {

    name = name.trim();

    if (name.length === 0)
        throw new Error("Name darf nicht leer sein.");

    const id = name.toLowerCase();

    const driverRef = doc(db, DRIVER_COLLECTION, id);

    const existing = await getDoc(driverRef);

    if (existing.exists())
        throw new Error("Fahrer existiert bereits.");

    await setDoc(driverRef, {
        name
    });

}

export async function removeDriver(id) {

    await deleteDoc(doc(db, DRIVER_COLLECTION, id));

}