window.addEventListener("load", setup);

class Drink {
    constructor(name, imageFile, type, ingredients, howToPrepare) {
        this.name = name;
        this.imageFile = imageFile;
        this.type = type;
        this.ingredients = [];
        this.howToPrepare = howToPrepare;
        let ingredientList = ingredients.split(",");
        for (let ingredient of ingredientList) {
            this.ingredients.push(ingredient.trim());
        }
    }

}

async function setup() {
    let fileContents = await readDrinksDataFile();
    console.log(fileContents);
    
    all_drinks = createDrinkObjects(fileContents);
    console.log(all_drinks);

    updateScreen();
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

function createDrinkObjects(fileContents) {
    let drinkList = [];
    let rawData = fileContents.split("\n");
    for (line of rawData) {
        if (line.trim()) {
            let keyAndValue = line.split(":");
            if (keyAndValue[0] == "name") {
                drinkName = keyAndValue[1];
            } else if (keyAndValue[0] == "image") {
                imagePath = keyAndValue[1];
            } else if (keyAndValue[0] == "type") {
                type = keyAndValue[1];
            } else if (keyAndValue[0] == "ingredients") {
                ingredients = keyAndValue[1];
            } else if (keyAndValue[0] == "how to prepare") {
                howToPrepare = keyAndValue[1];
            }
        } else {
            // finished with this drink info, create the drink object
            let drink = new Drink(drinkName, imagePath, type, ingredients, howToPrepare);
            drinkList.push(drink);
        }
    }
    return drinkList;
}

function updateScreen() {
    let view_all_requested_drinks_ul_reference = document.getElementById("view_all_requested_drinks_ul");
    view_all_requested_drinks_ul_reference.innerHTML = "";
    for (let drink of all_drinks) {
        //create list item
        let li_element = document.createElement("li");

        //create img
        let img_element = document.createElement("img");
        img_element.setAttribute("src", "resources/images/" + drink.imageFile);

        //create h3
        let drink_name_reference = document.createElement("h3");
        drink_name_reference.textContent = drink.name;

        //add the image and h3 into li
        li_element.append(img_element, drink_name_reference);

        //add li into ul
        view_all_requested_drinks_ul_reference.append(li_element);


    }

}