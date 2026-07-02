export function calculatePoints(prediction, result) {

    let points = 0;

    for (let i = 0; i < 3; i++) {

        // Richtige Position
        if (prediction[i] === result[i]) {

            points += 3;
            continue;

        }

        // Fahrer in Top 3
        if (result.includes(prediction[i])) {

            points += 1;

        }

    }

    return points;

}