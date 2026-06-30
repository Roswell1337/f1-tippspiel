import { db } from "./firebase.js";

console.log("Firebase verbunden:", db);

document.getElementById("tipButton").addEventListener("click", () => {
    alert("Firebase ist verbunden 🚀");
});