const pages = {
    players: document.getElementById("playersPage"),
    drivers: document.getElementById("driversPage"),
    events: document.getElementById("eventsPage"),
    results: document.getElementById("resultsPage")
};

document.querySelectorAll(".menuButton").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".page").forEach(page => {
            page.classList.add("hidden");
        });

        document.querySelectorAll(".menuButton").forEach(btn => {
            btn.classList.remove("active");
        });

        pages[button.dataset.page].classList.remove("hidden");
        button.classList.add("active");

    });

});

import "./players.js";
import "./drivers.js";
import "./events.js";
import "./results.js";