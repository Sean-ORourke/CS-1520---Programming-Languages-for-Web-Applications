window.addEventListener("load", setup);

function setup() {
    readDrinksDataFile();
}

async function readDrinksDataFile() {
    return await fetch("./resources/drink_database/drinks_database.txt")
    .then(response => {
        return response.text();
    })
    .then(data => {
        return data.replaceAll("\t", "");
    })
}