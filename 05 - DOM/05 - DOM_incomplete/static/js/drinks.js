window.addEventListener("load", setup);

let all_drinks;
let drink_counter = 0;

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

    retrieve_DOM_references();

    addEventListeners();

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
    let rawData = fileContents.split("\r\n");
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

    let drink_type_selection = drink_selection_reference.value;
    requested_drinks = get_drinks_for_selection(drink_type_selection);
    if (view_type_all_drinks_reference.checked) {
        populate_multiple_drinks_area(requested_drinks);
    } else if (view_type_one_drink_reference.checked) {
        populate_one_drink_area(requested_drinks);

    }
    populate_multiple_drinks_area(requested_drinks);


}


function populate_multiple_drinks_area(requested_drinks) {



    let view_all_requested_drinks_ul_reference = document.getElementById("view_all_requested_drinks_ul");
    view_all_requested_drinks_ul_reference.innerHTML = "";

    view_all_requested_drinks_ul_reference.style.display = "block";
    detailed_drink_reference.style.display = "none";

    for (let drink of requested_drinks) {
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

function retrieve_DOM_references() {
    drink_selection_reference = document.getElementById("drink_selection");
    view_type_all_drinks_reference = document.getElementById("view_type_all_drinks");
    view_type_one_drink_reference = document.getElementById("view_type_one_drink");

    search_input_reference = document.getElementById("search_input");
    search_button_reference = document.getElementById("search_button");
    view_all_requested_drinks_ul_reference = document.getElementById("view_all_requested_drinks_ul");
    detailed_drink_reference = document.getElementById("detailed_drink");
    single_drink_name_reference = document.getElementById("single_drink_name");
    single_drink_image_reference = document.getElementById("single_drink_image");
    single_drink_type_reference = document.getElementById("single_drink_type");
    single_drink_ingredients_reference = document.getElementById("single_drink_ingredients");
    single_drink_how_to_prepare_reference = document.getElementById("single_drink_how_to_prepare");
    left_arrow_reference = document.getElementById("left_arrow");
    right_arrow_reference = document.getElementById("right_arrow");

}

function addEventListeners() {
    drink_selection_reference.addEventListener("change", updateScreen);
    view_type_all_drinks_reference.addEventListener("change", updateScreen);
    view_type_one_drink_reference.addEventListener("change", updateScreen);

}

function get_drinks_for_selection(drink_type_selection) {
    console.log("get_drinks_for_selection()");
    let requested_drinks = [];
    if (drink_type_selection == "All_Drinks") {
        return all_drinks;

    } else if (drink_type_selection == "Before_Dinner") {
        console.log("elseif before");
        for (let drink of all_drinks) {
            if (drink.type == "Before Dinner Cocktail") {
                console.log(drink.type);
                requested_drinks.push(drink);
                console.log(drink);
            }
        }

    } else if (drink_type_selection == "After_Dinner") {
        for (let drink of all_drinks) {
            if (drink.type == "After Dinner Cocktail") {
                console.log(drink.type);
                requested_drinks.push(drink);
                console.log(drink);
            }
        }

    } else if (drink_type_selection == "All_day") {
        for (let drink of all_drinks) {
            if (drink.type == "All Day Cocktail") {
                console.log(drink.type);
                requested_drinks.push(drink);
                console.log(drink);
            }
        }

    }
    return requested_drinks;
}

function populate_one_drink_area(requested_drinks) {
    view_all_requested_drinks_ul_reference.style.display = "none";
    detailed_drink_reference.style.display = "block";
    // console.log("bannanna", drink_counter);
    console.log(requested_drinks);
    let drink = requested_drinks[drink_counter];
    console.log(drink_counter);
    single_drink_image_reference.setAttribute("src", "resources/images/" + drink.imageFile);
    console.log(drink.imageFile);
    single_drink_name_reference.textContent = drink.name;
    console.log(drink.name);
    single_drink_name_reference.textContent = drink.type;
    console.log(drink.type);
    single_drink_ingredients_reference.innerHTML = "";
    for (let ingredient of drink.ingredients) {
        let li_reference = document.createElement("li");
        li_reference.textContent = ingredient;
        single_drink_ingredients_reference.append(li_reference);


    }
    single_drink_how_to_prepare_reference.textContent = drink.howToPrepare;

}

function handleLeftArrowEvent() {
    drink_counter--;
    if (drink_counter < 0) {
        drink_counter = requested_drinks.length - 1;
    }
    updateScreen();
}

function handleRightArrowEvent() {
    drink_counter++;
    if (drink_counter >= requested_drinks.length) {
        drink_counter = 0;
    }
    updateScreen();
}

// function onHandeleDrinkClick(drink) {
//     for (drink_counter = 0; drink_counter < requested_drinks.length; drink_counter++) {
//         if (requested_drinks[drink_counter].name == drink.name) {

//         }
//     }
// }