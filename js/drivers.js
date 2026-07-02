import {
    getDrivers,
    addDriver,
    removeDriver
} from "./services/driverService.js";

const input = document.getElementById("driverName");
const addButton = document.getElementById("addDriver");
const list = document.getElementById("driverList");

async function loadDrivers() {

    const drivers = await getDrivers();

    list.innerHTML = "";

    drivers.forEach(driver => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${driver.name}</span>
            <button class="deleteButton">Löschen</button>
        `;

        li.querySelector("button").addEventListener("click", async () => {

            if (!confirm(`${driver.name} wirklich löschen?`))
                return;

            await removeDriver(driver.id);

            await loadDrivers();

        });

        list.appendChild(li);

    });

}

addButton.addEventListener("click", async () => {

    try {

        await addDriver(input.value);

        input.value = "";

        await loadDrivers();

    } catch (error) {

        alert(error.message);

    }

});

loadDrivers();