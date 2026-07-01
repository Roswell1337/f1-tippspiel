export async function getRaceList() {

    const response = await fetch("./data/races2026.json");

    return await response.json();

}