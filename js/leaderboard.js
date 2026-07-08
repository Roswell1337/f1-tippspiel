import { getAllPredictions } from "./services/predictionService.js";

const tbody = document.querySelector("#leaderboard tbody");

async function loadLeaderboard() {

    const predictions = await getAllPredictions();

    const standings = {};

    predictions.forEach(prediction => {

        if (!standings[prediction.player]) {

            standings[prediction.player] = 0;

        }

        standings[prediction.player] += prediction.totalPoints;

    });

    const players = Object.entries(standings);

    players.sort((a,b)=>b[1]-a[1]);

    tbody.innerHTML="";

    players.forEach((player,index)=>{

        const tr=document.createElement("tr");

        tr.innerHTML=`

            <td>${index+1}</td>

            <td>${player[0]}</td>

            <td>${player[1]}</td>

        `;

        tbody.appendChild(tr);

    });

}

loadLeaderboard();