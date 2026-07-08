import { getCurrentEvent } from "./services/raceService.js";

const raceName = document.getElementById("raceName");
const countdown = document.getElementById("countdown");

let deadline = null;

function updateCountdown() {

    if (!deadline) return;

    const diff = deadline - new Date();

    if (diff <= 0) {

        countdown.textContent = "Tippabgabe beendet";
        return;

    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;

    countdown.textContent =
        `${days} Tage ${hours} Stunden ${minutes} Minuten`;

}

async function init() {

    const event = await getCurrentEvent();

    if (!event) {

        raceName.textContent = "Noch kein aktives Event.";

        countdown.textContent = "--";

        return;

    }

    raceName.innerHTML = `
        <strong>${event.name}</strong><br>
        ${event.track}
        ${event.hasSprint ? "<br>🏎 Sprint-Wochenende" : ""}
        <br><br>
        Deadline:<br>
        ${event.deadline.replace("T", " ")}
    `;

    deadline = new Date(event.deadline);

    updateCountdown();

    setInterval(updateCountdown, 60000);

}

init();

document.getElementById("tipButton").addEventListener("click", () => {

    window.location.href = "tip.html";

});

document.getElementById("leaderboardButton").addEventListener("click", () => {

    window.location.href = "leaderboard.html";

});